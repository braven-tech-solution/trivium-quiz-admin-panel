const jwt = require("jsonwebtoken");
const catchAsync = require("../shared/catchAsync");
const sendResponse = require("../shared/sendResponse");
const config = require("../config/index");

const isValidUser = catchAsync(async (req, res, next) => {
  const { authorization } = req.headers;
  let token;
  let decodedData;
  if (authorization && authorization.startsWith("Bearer")) {
    token = authorization.split(" ")[1];
    if (token && token !== undefined && token !== null && token !== "null") {
      decodedData = jwt.verify(token, config.access_secret);
    }
  }
  if (!authorization || !decodedData) {
    return sendResponse(res, 401, false, "Unauthorized", {});
  }
  req.body.userId = decodedData._id;
  req.body.userRole = decodedData.role;
  req.body.userEmail = decodedData.email;
  req.body.userFullName = decodedData.fullName;
  next();
});

const tokenCheck = catchAsync(async (req, res, next) => {
  const { signuptoken } = req.headers;
  if (signuptoken && signuptoken.startsWith("signUpToken")) {
    const token = signuptoken.split(" ")[1];
    const decodedData = jwt.verify(token, config.refresh_secret);
    req.body.userData = decodedData;
  }
  next();
});

const noCheck = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    let token;
    let decodedData;
    if (authorization && authorization.startsWith("Bearer")) {
      token = authorization.split(" ")[1];
      decodedData = jwt.verify(token, config.jwt_access_token);
    } else {
      return next();
    }
    req.body.userId = decodedData._id;
    next();
  } catch (err) {
    console.log(err);
    next();
  }
};

const verifyRole = (...roles) => {
  return async (req, res, next) => {
    console.log(roles);
    try {
      const token = req.headers.authorization;
      if (!token) {
        return sendResponse(res, 401, false, "Invalid authorization", {});
      }
      const verifiedUser = jwt.verify(token, config.access_secret);

      req.user = verifiedUser;

      console.log(verifiedUser);

      if (roles.length && !roles.includes(verifiedUser.role)) {
        return sendResponse(res, 403, false, "Roles doesn't match", {});
      }

      next();
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
};
const auth = { isValidUser, tokenCheck, noCheck, verifyRole };
module.exports = auth;
