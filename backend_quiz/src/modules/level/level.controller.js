const catchAsync = require("../../shared/catchAsync");
const sendResponse = require("../../shared/sendResponse");
const questionService = require("../question/question.service");
const levelService = require("./level.service.js");

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
  const userAnswers = req.body;
  const { id } = req.params;

  console.log(userAnswers);
  console.log(id);

  const allQuestions = await questionService.getAllQuestionByLevelId(id);

  let correctCount = 0;
  let correctAnswers = [];

  console.log(allQuestions);

  allQuestions.forEach((question) => {
    const userAnswer = userAnswers[question._id];
    if (userAnswer === question.correctAnswer) {
      correctCount += 1;
      correctAnswers.push({
        ...question._doc,
        userAnswer,
        correctAnswer: question.correctAnswer,
      });
    } else {
      correctAnswers.push({
        ...question._doc,
        userAnswer: "",
        correctAnswer: question.correctAnswer,
      });
    }
  });

  // res.json({
  //   correctCount,
  //   correctAnswers,
  //   totalQuestions: allQuestions.length,
  // });

  // const quiz = await levelService.addLevel(payload);
  const payload = {
    correctCount,
    correctAnswers,
    totalQuestions: allQuestions.length,
  };

  if (payload) {
    sendResponse(res, 200, true, "quiz submit successfully", payload);
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
