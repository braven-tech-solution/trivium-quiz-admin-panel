const express = require("express");
const levelController = require("./level.controller.js");
const fileUpload = require("../../middlewares/fileUpload.js");

const upload = fileUpload("./src/uploads/level/");

const levelRouter = express.Router();

levelRouter
  .post(
    "",
    // auth.verifyRole(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN),
    upload.fields([{ name: "image", maxCount: 1 }]),
    levelController.addLevel
  )
  .post("/submit/:id", levelController.submitQuiz)
  .get("", levelController.getAllLevel)
  .get("/:categoryId", levelController.getAllLevelByCategoryId)
  .get("/app/:categoryId", levelController.getAllLevelByCategoryId);

module.exports = levelRouter;
