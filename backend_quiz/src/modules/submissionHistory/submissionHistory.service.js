const SubmissionHistory = require("./submissionHistory.model");
const Schedule = require("./submissionHistory.model");
// const NodeCache = require("node-cache");

// const nodeCache = new NodeCache();

const addSubmissionHistory = async (payload) => {
  const result = await SubmissionHistory.create(payload);
  // nodeCache.flushAll();
  return result;
};

const getSubmissionHistoryByUserId = async (userId) => {
  const getSchedule = await SubmissionHistory.findOne({ userId });
  // nodeCache.flushAll();
  return getSchedule;
};

const getSubmissionHistoryByScheduleId = async (scheduleId) => {
  const getSchedule = await SubmissionHistory.find({ scheduleId })
    .populate({
      path: "userId",
      select: "_id fullName phone email image",
    })
    .select("-answer")
    .sort("-toatalSubmitPoint");

  return getSchedule;
};

const getSubmissionHistoryByUserAndScheduleId = async (userId, scheduleId) => {
  const getSchedule = await SubmissionHistory.findOne({
    userId,
    scheduleId,
  })
    .populate("scheduleId")
    .populate("answer.questionId");
  // nodeCache.flushAll();
  return getSchedule;
};

const submissionHistoryService = {
  addSubmissionHistory,
  getSubmissionHistoryByUserId,
  getSubmissionHistoryByScheduleId,
  getSubmissionHistoryByUserAndScheduleId,
};

module.exports = submissionHistoryService;
