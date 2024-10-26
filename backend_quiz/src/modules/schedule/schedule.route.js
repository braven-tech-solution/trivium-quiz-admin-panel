const express = require("express");
const scheduleController = require("./schedule.controller.js");
const USER_ROLE = require("../../helpers/userRole.js");
const auth = require("../../middlewares/auth.js");
const fileUpload = require("../../middlewares/fileUpload.js");

const upload = fileUpload("./src/uploads/schedule/");
const scheduleRouter = express.Router();

scheduleRouter
  .post(
    "",
    // auth.verifyRole(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN),
    upload.fields([{ name: "image", maxCount: 1 }]),
    scheduleController.addSchedule
  )
  .post(
    "/submit/:id",
    auth.verifyRole(USER_ROLE.USER),
    scheduleController.submitQuiz
  )
  .get("", scheduleController.getAllSchedule)
  .get("/total-schedule-quiz", scheduleController.getTotalScheduleQuiz)
  .get(
    "/:id",
    auth.verifyRole(USER_ROLE.USER),
    scheduleController.getAllQuestionByLiveId
  )
  .get(
    "/result/:scheduleId",
    auth.verifyRole(USER_ROLE.USER, USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN),
    scheduleController.getResultViewByScheduleId
  );

module.exports = scheduleRouter;
