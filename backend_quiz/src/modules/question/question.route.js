const express = require("express");
const questionController = require("./question.controller.js");

const auth = require("../../middlewares/auth.js");
const USER_ROLE = require("../../helpers/userRole.js");

const questionRouter = express.Router();

questionRouter
  .post(
    "",
    // auth.verifyRole(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN),
    questionController.addQuestion
  )
  .get(
    "/",
    auth.verifyRole(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN),
    questionController.getAllQuestion
  )
  .get(
    "/live",
    auth.verifyRole(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN),
    questionController.getLiveQuestion
  )
  .get("/level", questionController.getLevelQuestion)
  .get("/count", questionController.totalQuestionCount)
  .get("/level/:id", questionController.getAllQuestionByLevelId);

module.exports = questionRouter;
