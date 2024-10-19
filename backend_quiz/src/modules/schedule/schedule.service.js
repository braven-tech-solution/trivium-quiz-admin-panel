const Schedule = require("./schedule.model");
// const NodeCache = require("node-cache");

// const nodeCache = new NodeCache();

const addSchedule = async (payload) => {
  const savedSchedule = await Schedule.create(payload);
  // nodeCache.flushAll();
  return savedSchedule;
};

const getAllSchedule = async () => {
  const getSchedule = await Schedule.find({});
  // nodeCache.flushAll();
  return getSchedule;
};

const getLiveQuizById = async (id) => {
  const getSchedule = await Schedule.findById(id);
  // nodeCache.flushAll();
  return getSchedule;
};

const getTotalScheduleQuiz = async (email, phone) => {
  const totalUserCount = await Schedule.countDocuments({});
  return totalUserCount;
};

const scheduleService = {
  addSchedule,
  getAllSchedule,
  getLiveQuizById,
  getTotalScheduleQuiz,
};

module.exports = scheduleService;
