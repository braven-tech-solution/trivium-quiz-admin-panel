const LevelQuizSubmissionHistory = require("./levelQuizSubmissionHistory .model");

// const NodeCache = require("node-cache");

// const nodeCache = new NodeCache();

const addSubmissionHistory = async (payload) => {
  const result = await LevelQuizSubmissionHistory.create(payload);
  // nodeCache.flushAll();
  return result;
};

const getSubmissionHistoryByUserId = async (userId) => {
  const getSchedule = await LevelQuizSubmissionHistory.findOne({ userId });
  // nodeCache.flushAll();
  return getSchedule;
};

const getSubmissionHistoryBylevelId = async (userId, levelId) => {
  const getSchedule = await LevelQuizSubmissionHistory.findOne({
    userId,
    levelId,
  })
    .populate("levelId")
    .populate("answer.questionId");
  // nodeCache.flushAll();
  return getSchedule;
};

const levelQuizSubmissionHistoryService = {
  addSubmissionHistory,
  getSubmissionHistoryByUserId,
  getSubmissionHistoryBylevelId,
};

module.exports = levelQuizSubmissionHistoryService;
