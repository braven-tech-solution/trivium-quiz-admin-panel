const express = require("express");
const userController = require("./user.controller.js");
const auth = require("../../middlewares/auth.js");
const USER_ROLE = require("../../helpers/userRole.js");
const fileUpload = require("../../middlewares/fileUpload.js");

const upload = fileUpload("./src/uploads/profile/");
const userRouter = express.Router();

userRouter
  .post(
    "/signup",
    upload.fields([{ name: "image", maxCount: 5 }]),
    userController.addUser
  )
  .post("/verify-otp", userController.verifyUser)
  .post("/login", userController.login)
  .post("/forget-password", userController.forgetPassword)
  .get(
    "",
    auth.verifyRole(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN),
    userController.getAllUsers
  )
  .get("/:id", userController.getSingleUser)
  .get("/user/statistics", userController.usersStatistics)
  .get("/user/logout/true", userController.logout)

  .patch("/reset-password", userController.resetPassword)
  .patch(
    "/change-password",
    auth.verifyRole(USER_ROLE.USER, USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN),
    userController.changePassword
  )
  .patch("/otp/forget-password", userController.verifyForgetOtp)
  .put(
    "",
    upload.fields([{ name: "photo", maxCount: 1 }]),
    auth.verifyRole(USER_ROLE.USER, USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN),
    userController.updateUser
  )
  .delete(
    "/:id",
    auth.verifyRole(USER_ROLE.USER, USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN),
    userController.deleteUser
  );

module.exports = userRouter;
