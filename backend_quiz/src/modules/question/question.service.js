const Question = require("./question.model");
const NodeCache = require("node-cache");

const nodeCache = new NodeCache();

const addQuestion = async (payload) => {
  const savedQuestion = await Question.create(payload);
  nodeCache.flushAll();
  return savedQuestion;
};

const getAllQuestion = async () => {
  const allquestion = await Question.find({});
  return allquestion;
};

const getLiveQuestion = async () => {
  const levelQuestion = await Question.find({ model_type: "Schedule" });
  return levelQuestion;
};

const getLevelQuestion = async () => {
  const levelQuestion = await Question.find({ model_type: "Level" });
  return levelQuestion;
};

const getAllQuestionByLevelId = async (id) => {
  const getQuestion = await Question.find({
    model_id: id,
    model_type: { $ne: "Schedule" },
  });
  // nodeCache.flushAll();
  return getQuestion;
};
const getAllQuestionByLivelId = async (id) => {
  const getQuestion = await Question.find({
    model_id: id,
    model_type: { $ne: "Level" },
  }).select("-correctAnswer");
  // nodeCache.flushAll();
  return getQuestion;
};
const totalQuestionCount = async () => {
  const scheduleCount = await Question.countDocuments({
    model_type: "Schedule",
  });
  const levelCount = await Question.countDocuments({ model_type: "Level" });
  // nodeCache.flushAll();
  return { scheduleCount, levelCount };
};

const updateQuestionById = async (questionId, data) => {
  // console.log({ questionId });
  const res = await Question.findByIdAndUpdate(questionId, data);

  return res;
};

const deleteQuestionById = async (questionId) => {
  // console.log({ questionId });
  const res = await Question.findByIdAndDelete(questionId);

  return res;
};

const questionService = {
  addQuestion,
  getAllQuestion,
  getLevelQuestion,
  getLiveQuestion,
  getAllQuestionByLevelId,
  getAllQuestionByLivelId,
  totalQuestionCount,
  updateQuestionById,
  deleteQuestionById,
};

module.exports = questionService;
