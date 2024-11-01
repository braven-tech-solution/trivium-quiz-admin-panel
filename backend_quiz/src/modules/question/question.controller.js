const catchAsync = require("../../shared/catchAsync");
const sendResponse = require("../../shared/sendResponse");
const levelService = require("../level/level.service");
const scheduleService = require("../schedule/schedule.service");
const questionService = require("./question.service");

const addQuestion = catchAsync(async (req, res) => {
  const payload = { ...req.body };

  const question = await questionService.addQuestion(payload);

  if (question) {
    if (payload?.model_type === "Level") {
      await levelService.updateNumberOfQuestions(payload?.model_id);
    } else if (payload?.model_type === "Schedule") {
      await scheduleService.updateNumberOfQuestionsOfSchedule(
        payload?.model_id
      );
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

const getLiveQuestion = catchAsync(async (req, res) => {
  const levelQuestion = await questionService.getLiveQuestion();

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
  const level = await levelService.getSingleLeveById(id);

  if (!level) {
    sendResponse(res, 400, false, "Failed to get question", {});
  }
  const question = await questionService.getAllQuestionByLevelId(id);

  console.log(question);

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

const updateQuestionById = catchAsync(async (req, res) => {
  const payload = { ...req.body };

  const { scheduleId } = req.params;
  if (req.files) {
    if (req.files.image) {
      const image = req.files.image[0].filename;
      payload.image = `/uploads/schedule/${image}`;
    }
  }

  const schedule = await questionService.updateQuestionById(
    scheduleId,
    payload
  );

  if (schedule) {
    sendResponse(res, 201, true, "schedule update successfully", schedule);
  } else {
    sendResponse(res, 400, false, "Failed to update schedule", {});
  }
});

const deleteQuestionById = catchAsync(async (req, res) => {
  const { questionId } = req.params;

  const question = await questionService.deleteQuestionById(questionId);

  if (question) {
    sendResponse(res, 201, true, "question delete successfully", question);
  } else {
    sendResponse(res, 400, false, "Failed to delete question", {});
  }
});

const questionController = {
  addQuestion,
  getAllQuestion,
  getLevelQuestion,
  getLiveQuestion,
  getAllQuestionByLevelId,
  totalQuestionCount,
  updateQuestionById,
  deleteQuestionById,
};

module.exports = questionController;
