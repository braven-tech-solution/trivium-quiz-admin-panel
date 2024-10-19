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

  // console.log(user);

  const questions = await questionService.getAllQuestionByLevelId(id);
  const liveQuiz = await scheduleService.getLiveQuizById(id);
  const userData = await userService.getSingleUser(user.id);

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

  const aaaa = await submissionHistoryService.getSubmissionHistoryByUserId(
    user.id
  );

  if (aaaa) {
    return sendResponse(res, 400, false, "Can not submit multiple time.", {});
  }

  const processedAnswers = Object.entries(userAnswers).map(
    ([questionId, value]) => {
      return {
        questionId,
        value,
      };
    }
  );

  const submissionHistoryData = {
    userId: user.id,
    scheduleId: id,
    correctAnswer: 4,
    answer: processedAnswers,
  };

  const submissionHistoryDataAdd =
    await submissionHistoryService.addSubmissionHistory(submissionHistoryData);

  return sendResponse(res, 200, true, "quiz submit successfully", {
    submissionHistoryDataAdd,
    questions,
    liveQuiz,
    userData,
  });

  // console.log(userData.submitQuizLevelIds.includes(id));

  if (userData?.submitQuizLevelIds?.includes(id)) {
    sendResponse(
      res,
      400,
      true,
      "The user has already participated in this quiz.",
      {}
    );

    return;
  }

  let correctCount = 0;
  let answerWithQuestion = [];

  questions.forEach((question) => {
    const userAnswer = userAnswers[question._id];
    if (userAnswer === question.correctAnswer) {
      correctCount += 1;
      answerWithQuestion.push({
        ...question._doc,
        userAnswer,
        correctAnswer: question.correctAnswer,
      });
    } else {
      answerWithQuestion.push({
        ...question._doc,
        userAnswer: "",
        correctAnswer: question.correctAnswer,
      });
    }
  });

  const totalQuestions = questions.length;
  const newStrength = (correctCount / totalQuestions) * 100;

  // Update average correct percentage
  const oldAverageStrength = level.averageStrength || 0;
  const totalCompleteQuiz = level.totalCompleteQuiz || 0;

  const newAverageStrength =
    (oldAverageStrength * totalCompleteQuiz + newStrength) /
    (totalCompleteQuiz + 1);

  const payload = {
    averageStrength: newAverageStrength.toFixed(2),
    totalCompleteQuiz: totalCompleteQuiz + 1,
  };

  // update level data

  // update level data asynchronously
  process.nextTick(async () => {
    await levelService.updateLevelById(id, payload);
  });

  const userOldStrength = userData.strength || 0;
  const userCompleteQuiz = userData.completeQuiz || 0;
  const questionAnswer = userData.questionAnswer || 0;
  const correctAnswer = userData.correctAnswer || 0;
  const incorrectAnswer = userData.incorrectAnswer || 0;
  const addPoint = (correctCount / totalQuestions) * Number(level.point);

  const newUserAverageStrength =
    (userOldStrength * userCompleteQuiz + newStrength) / (userCompleteQuiz + 1);

  const userPayload = {
    point: Number((Number(userData.point) + addPoint).toFixed(2)),
    strength: newUserAverageStrength.toFixed(2),
    completeQuiz: userCompleteQuiz + 1,
    questionAnswer: questionAnswer + Number(totalQuestions),
    correctAnswer: correctAnswer + Number(correctCount),
    incorrectAnswer:
      Number(incorrectAnswer) + Number(totalQuestions) - Number(correctCount),
  };

  // update user profile data asynchronously
  process.nextTick(async () => {
    await userService.updateUser(user.id, userPayload, id);
  });

  const responseData = {
    point: Number(addPoint.toFixed(2)),
    correctAnswer: correctCount,
    totalQuestions: questions.length,
    yourStrength: Number(newStrength.toFixed(2)),
    averageStrengthOfLevel: Number(oldAverageStrength.toFixed(2)),
    answerWithQuestion,
  };

  if (responseData) {
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
