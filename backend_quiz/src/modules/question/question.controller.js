const catchAsync = require("../../shared/catchAsync");
const sendResponse = require("../../shared/sendResponse");
const questionService = require("./question.service");

const addQuestion = catchAsync(async (req, res) => {
  const payload = { ...req.body };

  const question = await questionService.addQuestion(payload);

  if (question) {
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

const questionController = {
  addQuestion,
  getAllQuestion,
  getAllQuestionByLevelId,
};

module.exports = questionController;
