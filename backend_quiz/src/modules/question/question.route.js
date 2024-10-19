const express = require("express");
const questionController = require("./question.controller.js");

const questionRouter = express.Router();

questionRouter
  .post(
    "",
    // auth.verifyRole(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN),
    questionController.addQuestion
  )
  .get("/", questionController.getAllQuestion)
  .get("/level", questionController.getLevelQuestion)
  .get("/count", questionController.totalQuestionCount)
  .get("/level/:id", questionController.getAllQuestionByLevelId);

module.exports = questionRouter;
