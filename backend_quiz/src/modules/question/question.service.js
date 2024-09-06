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
const getLevelQuestion = async () => {
  const levelQuestion = await Question.find({ model_type: "Level" });
  return levelQuestion;
};

const getAllQuestionByLevelId = async (id) => {
  const getQuestion = await Question.find({ model_id: id });
  // nodeCache.flushAll();
  return getQuestion;
};

const questionService = {
  addQuestion,
  getAllQuestion,
  getLevelQuestion,
  getAllQuestionByLevelId,
};

module.exports = questionService;
