const catchAsync = require("../../shared/catchAsync");
const sendResponse = require("../../shared/sendResponse");
const levelService = require("../level/level.service");
const questionService = require("./question.service");

const addQuestion = catchAsync(async (req, res) => {
  const payload = { ...req.body };

  const question = await questionService.addQuestion(payload);

  if (question) {
    if (payload?.model_type === "Level") {
      await levelService.updateNumberOfQuestions(payload?.model_id);
    }
    sendResponse(res, 200, true, "Question added successfully", question);
  } else {
    sendResponse(res, 400, false, "Failed to add question", {});
  }
});

const getAllQuestion = catchAsync(async (req, res) => {
  const question = await questionService.getAllQuestion();

  if (question) {
    sendResponse(res, 200, true, "question get successfully", question);
  } else {
    sendResponse(res, 400, false, "Failed to get question", {});
  }
});
const getLevelQuestion = catchAsync(async (req, res) => {
  const levelQuestion = await questionService.getLevelQuestion();

  if (levelQuestion) {
    sendResponse(
      res,
      200,
      true,
      "all level question get successfully",
      levelQuestion
    );
  } else {
    sendResponse(res, 400, false, "Failed to get question", {});
  }
});

const getAllQuestionByLevelId = catchAsync(async (req, res) => {
  const { id } = req.params;

  console.log(id);
  const question = await questionService.getAllQuestionByLevelId(id);

  if (question) {
    sendResponse(res, 200, true, "Question get successfully", question);
  } else {
    sendResponse(res, 400, false, "Failed to get question", {});
  }
});
const totalQuestionCount = catchAsync(async (req, res) => {
  const count = await questionService.totalQuestionCount();

  if (count) {
    sendResponse(res, 200, true, "Question count successfully", count);
  } else {
    sendResponse(res, 400, false, "Failed to count question", {});
  }
});

const questionController = {
  addQuestion,
  getAllQuestion,
  getLevelQuestion,
  getAllQuestionByLevelId,
  totalQuestionCount,
};

module.exports = questionController;
