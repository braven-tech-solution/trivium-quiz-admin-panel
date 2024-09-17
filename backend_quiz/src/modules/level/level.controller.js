const catchAsync = require("../../shared/catchAsync");
const sendResponse = require("../../shared/sendResponse");
const questionService = require("../question/question.service");
const levelService = require("./level.service.js");
const userService = require("../user/user.service");

const addLevel = catchAsync(async (req, res) => {
  const payload = { ...req.body };

  if (req.files) {
    if (req.files.image) {
      const image = req.files.image[0].filename;
      payload.image = `/uploads/level/${image}`;
    }
  }

  const quiz = await levelService.addLevel(payload);

  if (quiz) {
    sendResponse(res, 200, true, "level added successfully", quiz);
  } else {
    sendResponse(res, 400, false, "Failed to add level", {});
  }
});

const submitQuiz = catchAsync(async (req, res) => {
  const user = req.user;
  const userAnswers = req.body;
  const { id } = req.params;

  console.log("aaaaaaaaaaa");

  console.log(user);

  const questions = await questionService.getAllQuestionByLevelId(id);
  const level = await levelService.getSingleLeveById(id);
  const userData = await userService.getSingleUser(user.id);

  console.log(userData);

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
  const percentageCorrect = (correctCount / totalQuestions) * 100;

  // Update average correct percentage
  const currentAverage = level.avarageCorrectPercent || 0;
  const submissionCount = level.submissionCount || 0;

  const newAverage =
    (currentAverage * submissionCount + percentageCorrect) /
    (submissionCount + 1);

  const payload = {
    avarageCorrectPercent: newAverage.toFixed(2),
    submissionCount: submissionCount + 1,
  };

  // update level data

  // update level data asynchronously
  process.nextTick(async () => {
    await levelService.updateLevelById(id, payload);
  });

  const userCurrentAverage = userData.avarageCorrectPercent || 0;
  const userSubmissionCount = userData.submissionCount || 0;

  const newUserAverage =
    (userCurrentAverage * userSubmissionCount + percentageCorrect) /
    (userSubmissionCount + 1);

  const userPayload = {
    avarageCorrectPercent: newUserAverage.toFixed(2),
    submissionCount: userSubmissionCount + 1,
    point: Number(userData.point) + Number(level.point),
  };

  // update user profile data asynchronously
  process.nextTick(async () => {
    await userService.updateUser(user.id, userPayload);
  });

  const responseData = {
    correctCount,
    totalQuestions: questions.length,
    yourCorrectPercent: Number(percentageCorrect.toFixed(2)),
    avarageCorrectPercent: Number(newAverage.toFixed(2)),
    answerWithQuestion,
  };

  if (responseData) {
    sendResponse(res, 200, true, "quiz submit successfully", responseData);
  } else {
    sendResponse(res, 400, false, "Failed to add level", {});
  }
});

const getAllLevelByCategoryId = catchAsync(async (req, res) => {
  const { categoryId } = req.params;

  // console.log({ categoryId });
  const level = await levelService.getAllLevelByCategoryId(categoryId);

  if (level) {
    sendResponse(res, 200, true, "Level get successfully", level);
  } else {
    sendResponse(res, 400, false, "Failed to get level", {});
  }
});

const getAllLevel = catchAsync(async (req, res) => {
  const level = await levelService.getAllLevel();

  if (level) {
    sendResponse(res, 200, true, "Level get successfully", level);
  } else {
    sendResponse(res, 400, false, "Failed to get level", {});
  }
});

const levelController = {
  addLevel,
  submitQuiz,
  getAllLevelByCategoryId,
  getAllLevel,
};

module.exports = levelController;
