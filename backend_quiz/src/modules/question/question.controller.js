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
const getAllQuestionByTopId = catchAsync(async (req, res) => {
  const { id } = req.params;

  console.log(id);
  const level = await questionService.getAllQuestionByTopId(id);

  if (level) {
    sendResponse(res, 200, true, "Question get successfully", level);
  } else {
    sendResponse(res, 400, false, "Failed to get question", {});
  }
});

const questionController = {
  addQuestion,
  getAllQuestionByTopId,
};

module.exports = questionController;
