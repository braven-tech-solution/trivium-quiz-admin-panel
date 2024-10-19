const config = require("../../config/index.js");
const catchAsync = require("../../shared/catchAsync.js");
const sendResponse = require("../../shared/sendResponse.js");
const { createToken } = require("../../utils/createToken.js");
const OTP = require("../otp/otp.model.js");
const otpService = require("../otp/otp.service.js");
const User = require("./user.model.js");
const userService = require("./user.service.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const addUser = catchAsync(async (req, res) => {
  const userData = { ...req.body };

  if (req?.files?.photo) {
    const photo = req.files.photo[0].filename;
    userData.photo = `/uploads/orders/${photo}`;
  }

  if (!userData.email) {
    return sendResponse(res, 400, false, "Email is required");
  }

  if (!userData.phone) {
    return sendResponse(res, 400, false, "Phone number is required");
  }

  if (userData.password.length < 6) {
    return sendResponse(
      res,
      400,
      false,
      "Password must be at least 6 characters long"
    );
  }

  const userExist = await userService.getSingleUserByEmailAndPhone(
    userData.email,
    userData.phone
  );

  console.log(userExist);

  console.log(userData);

  if (userExist) {
    return sendResponse(res, 406, false, "User email or phone already exist");
  }

  const user = await userService.addUser(userData);

  const userJwtData = {
    fullName: user.fullName,
    role: user.role,
    email: user.email,
    phone: user.phone,
    id: user._id,
  };

  const accessToken = createToken(userJwtData, config.access_secret, "7d");

  const refreshToken = createToken(userJwtData, config.refresh_secret, "365d");

  const responseData = {
    fullName: user.fullName,
    role: user.role,
    email: user.email,
    phone: user.phone,
    photo: user.photo,
    _id: user._id,
    accessToken: accessToken,
    refreshToken: refreshToken,
  };

  return sendResponse(
    res,
    200,
    true,
    "Account Created Successfully",
    responseData
  );
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  console.log(email, password);
  const user = await User.findOne({ email });

  console.log(user);

  if (user?.isBlock) {
    sendResponse(res, 401, false, "Account Block", {});
  }

  if (user) {
    const auth = await bcrypt.compare(password, user.password);

    if (auth) {
      const userJwtData = {
        fullName: user.fullName,
        role: user.role,
        email: user.email,
        phone: user.phone,
        id: user._id,
      };

      const accessToken = createToken(userJwtData, config.access_secret, "7d");
      const refreshToken = createToken(
        userJwtData,
        config.refresh_secret,
        "365d"
      );

      const isProduction =
        config.node_env === "production" || config.node_env === "development";

      res.cookie("tokenExp", "1", {
        sameSite: "strict",
        secure: isProduction,
        path: "/",
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      });

      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        sameSite: "strict",
        secure: isProduction,
        path: "/",
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      });

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "strict",
        secure: isProduction,
        path: "/",
        expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year
      });

      const userData = {
        fullName: user.fullName,
        role: user.role,
        email: user.email,
        phone: user.phone,
        photo: user.photo,
        _id: user._id,
        accessToken: accessToken,
        refreshToken: refreshToken,
      };

      sendResponse(res, 200, true, "Successfully Logged in", userData);
    } else {
      sendResponse(res, 406, false, "Incorrect Password", {});
    }
  } else {
    sendResponse(
      res,
      401,
      false,
      "Employee with this Account does not exist",
      {}
    );
  }
});

const logout = catchAsync(async (req, res) => {
  // Clear the cookies containing tokens
  res.clearCookie("token");
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  res.clearCookie("tokenExp");

  sendResponse(res, 200, true, "Logged out successfully", {});
});

const getAllUsers = catchAsync(async (req, res) => {
  const { page = 1, limit = 10 } = req.query; // Default to page 1, limit 10

  const users = await userService.getAllUsers(parseInt(page), parseInt(limit));

  if (users) {
    sendResponse(res, 200, true, "All Users list", users);
  } else {
    sendResponse(res, 404, false, "Something went wrong", {});
  }
});

const getSingleUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const user = await userService.getSingleUser(id);

  if (user) {
    sendResponse(res, 200, true, "User Found", user);
  } else {
    sendResponse(res, 404, false, "No user found", {});
  }
});

const getSubmittedQuizsId = catchAsync(async (req, res) => {
  const { id } = req.user;
  console.log(id);
  const result = await userService.getSubmittedQuizsId(id);

  if (result) {
    sendResponse(res, 200, true, "User Found", result);
  } else {
    sendResponse(res, 404, false, "No user found", {});
  }
});

const getUserLeaderboard = catchAsync(async (req, res) => {
  const user = await userService.getUserLeaderboard();

  if (user) {
    sendResponse(res, 200, true, "User Found", user);
  } else {
    sendResponse(res, 404, false, "No user found", {});
  }
});

const getLoginUserLeaderboard = catchAsync(async (req, res) => {
  const { id } = req.user;
  const user = await userService.getSingleUserLeaderboard(id);

  if (user) {
    sendResponse(res, 200, true, "User Found", user);
  } else {
    sendResponse(res, 404, false, "No user found", {});
  }
});

const getSingleUserLeaderboard = catchAsync(async (req, res) => {
  const { id } = req.params;
  const user = await userService.getSingleUserLeaderboard(id);

  if (user) {
    sendResponse(res, 200, true, "User Found", user);
  } else {
    sendResponse(res, 404, false, "No user found", {});
  }
});

const usersStatistics = catchAsync(async (req, res) => {
  const result = await userService.getUsersStatistics(req.query);
  sendResponse(res, 200, true, "Users Statistics find successfully", result);
});

const getTotalUser = catchAsync(async (req, res) => {
  const result = await userService.getTotalUser();
  sendResponse(res, 200, true, "Total user get successfully", result);
});

const updateUser = catchAsync(async (req, res) => {
  const { fullName, phone, address, photo, current_password } = { ...req.body };
  const { id: userID } = req.user;

  const updateData = {
    fullName,
    phone,
    address,
    photo,
  };

  if (req.files) {
    if (req.files.photo) {
      const photoFileName = req.files.photo[0].filename;
      updateData.photo = `/uploads/profile/${photoFileName}`;
    }
  }

  const user = await userService.getSingleUser(userID);

  if (!user) {
    sendResponse(res, 401, false, "User with this email does not exist", {});
  }

  const updatedUser = await userService.updateUser(userID, updateData);
  if (updatedUser) {
    sendResponse(res, 200, true, "Profile updates successfully", updatedUser);
  } else {
    sendResponse(res, 404, false, "Something went wrong", {});
  }
});

const forgetPassword = catchAsync(async (req, res) => {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
  let otpPurpose = "forget-password";
  const { email } = req.body;
  const user = await User.findOne({ email }).select("-password");

  if (user === null || !user) {
    return sendResponse(
      res,
      401,
      false,
      "User with this email does not exist",
      {}
    );
  }

  const userData = {
    fullName: user.fullName,
    role: user.role,
    email: user.email,
    phone: user.phone,
    photo: user.photo,
    _id: user._id,
  };

  const verifyToken = createToken(userData, config.access_secret, "1h");

  // const verifyToken = jwt.sign({ ...user }, config.access_secret, {
  //   expiresIn: "1h",
  // });

  const existingOTP = await otpService.checkOTPByEmail(email);

  let otpData;
  if (existingOTP) {
    return sendResponse(res, 200, true, "otp-exist", verifyToken);
  } else {
    otpData = await otpService.sendOTP(
      user.fullName,
      email,
      "email",
      otpPurpose
    );
    return sendResponse(res, 200, true, "Check email for OTP", verifyToken);
  }
});

const verifyForgetOtp = catchAsync(async (req, res) => {
  const verifyData = { ...req.body };
  // console.log(verifyData);
  const otp = verifyData.otp.toString();
  const verifyToken = verifyData.verifyToken;

  if (!verifyToken) {
    return sendResponse(res, 401, false, "Missing Verify Token", {});
  }

  const verify = await OTP.findOne({ otp });

  if (!verify) {
    return sendResponse(res, 401, false, "Invalid OTP", {});
  }
  if (verify && verifyToken) {
    return sendResponse(res, 200, true, "Success", verifyToken);
  }
});

const resetPassword = catchAsync(async (req, res) => {
  const resetData = { ...req.body };
  let password = resetData.password;
  const verifyToken = resetData.verifyToken;
  let verifiedUser = jwt.decode(verifyToken)._doc;
  if (verifiedUser === undefined) {
    verifiedUser = jwt.decode(verifyToken);
  }
  const userId = verifiedUser._id || verifiedUser.id;
  const existUser = await User.findOne({ _id: userId });

  const salt = await bcrypt.genSalt();
  password = await bcrypt.hash(password, salt);

  if (verifiedUser.id) {
    const matchPass = await bcrypt.compare(
      resetData.currentPassword,
      existUser.password
    );
    if (!matchPass) {
      return sendResponse(res, 401, false, "Incorrect Password", {});
    }
    // console.log(matchPass);
  }

  const user = await userService.updateUser(userId, {
    password,
  });
  if (user) {
    sendResponse(res, 200, true, "Password update successfully", user);
  } else {
    sendResponse(res, 404, false, "Something went wrong", {});
  }
});

const changePassword = catchAsync(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const userData = req.user;

  // console.log(data);
  // console.log(oldPassword);
  // console.log(newPassword);

  const user = await User.findById(userData.id);
  let auth = "";
  if (user) {
    auth = await bcrypt.compare(oldPassword, user.password);
  }

  if (auth) {
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(newPassword, salt);

    const updateData = {
      password,
    };

    const updatedUser = await userService.updateUser(userData.id, updateData);
    sendResponse(res, 200, true, "Successfully Password change", updatedUser);
  } else {
    sendResponse(res, 406, false, "Incorrect Password", {});
  }
});

const deleteUser = catchAsync(async (req, res) => {
  const { password } = req.body;
  const { id: userID } = req.user;

  const userData = await User.findById(userID);

  if (userData) {
    const matchPassword = await bcrypt.compare(password, userData.password);

    if (matchPassword) {
      sendResponse(res, 406, false, "Incorrect Password", {});

      const user = await userService.deleteUser(id);

      if (user) {
        sendResponse(res, 200, true, "User deleted successfully", user);
      } else {
        sendResponse(res, 404, false, "Something went wrong", {});
      }
    }
  } else {
    sendResponse(res, 404, false, "No user found", {});
  }
});

const userController = {
  addUser,
  login,
  logout,
  getAllUsers,
  getSingleUser,
  getSubmittedQuizsId,
  getUserLeaderboard,
  getLoginUserLeaderboard,
  getSingleUserLeaderboard,
  usersStatistics,
  getTotalUser,
  updateUser,
  changePassword,
  forgetPassword,
  verifyForgetOtp,
  resetPassword,
  deleteUser,
};

module.exports = userController;
