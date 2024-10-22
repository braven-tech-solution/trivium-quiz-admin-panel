const catchAsync = require("../../shared/catchAsync");
const sendResponse = require("../../shared/sendResponse");
const questionService = require("../question/question.service");
const levelService = require("./level.service.js");
const userService = require("../user/user.service");
const levelQuizSubmissionHistory = require("../levelQuizSubmissionHistory /levelQuizSubmissionHistory.service");
const levelQuizSubmissionHistoryService = require("../levelQuizSubmissionHistory /levelQuizSubmissionHistory.service");

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

  // console.log(user);

  const questions = await questionService.getAllQuestionByLevelId(id);
  const level = await levelService.getSingleLeveById(id);
  const userData = await userService.getSingleUser(user.id);

  console.log(userData.submitQuizLevelIds.includes(id));

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
  const toatalSubmitPoint = correctCount * Number(level.perQuestionMark);

  //todo  negative mark deducted
  const newUserAverageStrength =
    (userOldStrength * userCompleteQuiz + newStrength) / (userCompleteQuiz + 1);

  const userPayload = {
    point: Number((Number(userData.point) + toatalSubmitPoint).toFixed(2)),
    strength: newUserAverageStrength.toFixed(2),
    completeQuiz: userCompleteQuiz + 1,
    questionAnswer: questionAnswer + Number(totalQuestions),
    correctAnswer: correctAnswer + Number(correctCount),
    incorrectAnswer:
      Number(incorrectAnswer) + Number(totalQuestions) - Number(correctCount),
  };

  const processedAnswers = Object.entries(userAnswers).map(
    ([questionId, value]) => {
      return {
        questionId,
        userAnswer: value,
      };
    }
  );

  const submissionHistoryData = {
    userId: user.id,
    levelId: id,
    totalCorrectAnswer: correctCount,
    toatalSubmitPoint,
    strength: newStrength,
    answer: processedAnswers,
  };

  console.log(submissionHistoryData);

  const submissionHistoryDataAdd =
    await levelQuizSubmissionHistory.addSubmissionHistory(
      submissionHistoryData
    );

  const responseData = {
    point: Number(toatalSubmitPoint.toFixed(2)),
    correctAnswer: correctCount,
    totalQuestions: questions.length,
    yourStrength: Number(newStrength.toFixed(2)),
    averageStrengthOfLevel: Number(oldAverageStrength.toFixed(2)),
    answerWithQuestion,
  };

  // update user profile data asynchronously
  process.nextTick(async () => {
    await userService.updateUser(user.id, userPayload, id);
  });

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

const getResultViewByLevelId = catchAsync(async (req, res) => {
  const { levelId } = req.params;

  const { id: userId } = req.user;

  // console.log({ categoryId });
  const submissionHistory =
    await levelQuizSubmissionHistoryService.getSubmissionHistoryBylevelId(
      userId,
      levelId
    );

  console.log(userId, submissionHistory?.userId);

  if (!(userId === submissionHistory?.userId?.toString())) {
    return sendResponse(
      res,
      400,
      false,
      "You are not participate this quiz yet",
      {}
    );
  }

  if (submissionHistory) {
    sendResponse(
      res,
      200,
      true,
      "  get level quiz submission history successfully",
      submissionHistory
    );
  } else {
    sendResponse(res, 400, false, "Failed to get level history", {});
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
  getResultViewByLevelId,
  getAllLevel,
};

module.exports = levelController;
