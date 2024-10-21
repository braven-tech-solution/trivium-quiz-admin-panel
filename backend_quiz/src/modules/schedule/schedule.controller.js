const catchAsync = require("../../shared/catchAsync");
const sendResponse = require("../../shared/sendResponse");
const levelService = require("../level/level.service");
const questionService = require("../question/question.service");
const submissionHistoryService = require("../submissionHistory/submissionHistory.service");
const userService = require("../user/user.service");
const scheduleService = require("./schedule.service");
const moment = require("moment");

const addSchedule = catchAsync(async (req, res) => {
  const payload = { ...req.body };
  if (req.files) {
    if (req.files.image) {
      const image = req.files.image[0].filename;
      payload.image = `/uploads/schedule/${image}`;
    }
  }

  console.log(payload);

  const schedule = await scheduleService.addSchedule(payload);

  if (schedule) {
    sendResponse(res, 201, true, "Schedule added successfully", schedule);
  } else {
    sendResponse(res, 400, false, "Failed to add schedule", {});
  }
});

const submitQuiz = catchAsync(async (req, res) => {
  const user = req.user;
  const userAnswers = req.body;
  const { id } = req.params;

  const level = await levelService.getSingleLeveById(id);

  if (level) {
    sendResponse(res, 400, false, "Failed to get question", {});
  }

  console.log("aaaaaaaaaaa");

  const submissionHistoryByUser =
    await submissionHistoryService.getSubmissionHistoryByUserId(user.id);

  if (submissionHistoryByUser) {
    return sendResponse(res, 400, false, "Can not submit multiple time.", {});
  }

  // console.log(user);

  const questions = await questionService.getAllQuestionByLivelId(id);
  const liveQuiz = await scheduleService.getLiveQuizById(id);
  const userData = await userService.getSingleUser(user.id);

  if (!liveQuiz) {
    return sendResponse(res, 400, false, "Live Quiz not found", {});
  }

  if (Number(liveQuiz.requirePoint) > Number(userData.point)) {
    return sendResponse(
      res,
      400,
      false,
      `you have no enough point. Minimum required ${liveQuiz.requirePoint}`,
      {}
    );
  }

  const currentTime = moment(); // Get the current time
  const startTime = moment(liveQuiz.startTime);
  const endTime = moment(liveQuiz.endTime);

  if (currentTime.isBefore(startTime)) {
    const daysLeft = startTime.diff(currentTime, "days");
    const hoursLeft = startTime.diff(currentTime, "hours");
    const minutesLeft = startTime.diff(currentTime, "minutes") % 60; // Remainder for minutes
    return sendResponse(
      res,
      400,
      false,
      `${daysLeft} days ${hoursLeft} hours ${minutesLeft} minutes left until the quiz starts.`,
      {}
    );
  }

  if (currentTime.isAfter(endTime)) {
    return sendResponse(res, 400, false, "The quiz time has ended.", {});
  }

  let correctCount = 0;
  let answerWithQuestion = [];

  questions.forEach((question) => {
    const userAnswer = userAnswers[question._id];
    if (userAnswer === question.correctAnswer) {
      correctCount += 1;
    }
  });

  const totalQuestions = questions.length;
  const newStrength = (correctCount / totalQuestions) * 100 || 0;

  // Update average correct percentage
  const oldAverageStrength = liveQuiz.averageStrength || 0;
  const totalCompleteQuiz = liveQuiz.totalCompleteQuiz || 0;

  const newAverageStrength =
    (oldAverageStrength * totalCompleteQuiz + newStrength) /
    (totalCompleteQuiz + 1);

  const payload = {
    averageStrength: newAverageStrength.toFixed(2),
    totalCompleteQuiz: totalCompleteQuiz + 1,
  };

  process.nextTick(async () => {
    await scheduleService.updateLiveQuizById(id, payload);
  });

  const liveQuizCompleted = userData.liveQuizCompleted || 0;

  const userPayload = {
    point: Number(
      (Number(userData.point) - Number(liveQuiz.requirePoint)).toFixed(2)
    ),
    liveQuizCompleted: liveQuizCompleted + 1,
  };

  const toatalSubmitPoint = correctCount * Number(liveQuiz.perQuestionMark);

  const processedAnswers = Object.entries(userAnswers).map(
    ([questionId, value]) => {
      return {
        questionId,
        correctAnswer: value,
      };
    }
  );

  const submissionHistoryData = {
    userId: user.id,
    scheduleId: id,
    totalCorrectAnswer: 4,
    toatalSubmitPoint,
    strength: newStrength,
    answer: processedAnswers,
  };

  console.log(submissionHistoryData);

  const submissionHistoryDataAdd =
    await submissionHistoryService.addSubmissionHistory(submissionHistoryData);

  // update user profile data asynchronously
  process.nextTick(async () => {
    await userService.updateUser(user.id, userPayload, id);
  });

  const responseData = {
    point: Number(toatalSubmitPoint.toFixed(2)),
    correctAnswer: correctCount,
    toatalSubmitPoint,
    totalQuestions: questions.length,
    yourStrength: Number(newStrength.toFixed(2)),
  };

  if (submissionHistoryDataAdd) {
    sendResponse(res, 200, true, "quiz submit successfully", responseData);
  } else {
    sendResponse(res, 400, false, "Failed to add level", {});
  }
});

const getAllSchedule = catchAsync(async (req, res) => {
  const schedule = await scheduleService.getAllSchedule();

  if (schedule) {
    sendResponse(res, 200, true, "Schedule get successfully", schedule);
  } else {
    sendResponse(res, 400, false, "Failed to get schedule", {});
  }
});

const getAllQuestionByLiveId = catchAsync(async (req, res) => {
  const { id } = req.params;
  const user = req.user;

  const level = await levelService.getSingleLeveById(id);

  if (level) {
    sendResponse(res, 400, false, "Failed to get question", {});
  }

  const liveQuiz = await scheduleService.getLiveQuizById(id);
  const userData = await userService.getSingleUser(user?.id);

  if (!liveQuiz) {
    return sendResponse(res, 400, false, "Live Quiz not found", {});
  }

  const currentTime = moment(); // Get the current time
  const startTime = moment(liveQuiz.startTime);
  const endTime = moment(liveQuiz.endTime);

  if (currentTime.isBefore(startTime)) {
    const daysLeft = startTime.diff(currentTime, "days");
    const hoursLeft = startTime.diff(currentTime, "hours");
    const minutesLeft = startTime.diff(currentTime, "minutes") % 60; // Remainder for minutes
    return sendResponse(
      res,
      400,
      false,
      `${daysLeft} days ${hoursLeft} hours ${minutesLeft} minutes left until the quiz starts.`,
      {}
    );
  }

  if (currentTime.isAfter(endTime)) {
    return sendResponse(res, 400, false, "The quiz time has ended.", {});
  }

  if (liveQuiz.requirePoint > userData.point) {
    return sendResponse(
      res,
      400,
      false,
      `you have no enough point. Minimum required ${liveQuiz.requirePoint}`,
      {}
    );
  }

  console.log(id);
  const questions = await questionService.getAllQuestionByLivelId(id);

  console.log(questions);

  if (questions) {
    sendResponse(res, 200, true, "Question get successfully", questions);
  } else {
    sendResponse(res, 400, false, "Failed to get question", {});
  }
});

const getTotalScheduleQuiz = catchAsync(async (req, res) => {
  const schedule = await scheduleService.getTotalScheduleQuiz();

  if (schedule) {
    sendResponse(
      res,
      200,
      true,
      "Total Schedule Quiz  get successfully",
      schedule
    );
  } else {
    sendResponse(res, 400, false, "Failed to get Total Schedule Quiz", {});
  }
});

const scheduleController = {
  addSchedule,
  submitQuiz,
  getAllSchedule,
  getAllQuestionByLiveId,
  getTotalScheduleQuiz,
};

module.exports = scheduleController;
