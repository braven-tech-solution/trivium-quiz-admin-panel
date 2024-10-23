const Schedule = require("./schedule.model");
// const NodeCache = require("node-cache");

// const nodeCache = new NodeCache();

const addSchedule = async (payload) => {
  const savedSchedule = await Schedule.create(payload);
  // nodeCache.flushAll();
  return savedSchedule;
};

const getAllSchedule = async () => {
  const getSchedule = await Schedule.find({}).sort("-createdAt");
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

const updateLiveQuizById = async (livelId, payload) => {
  console.log({ livelId });
  const res = await Schedule.findByIdAndUpdate(
    livelId,
    payload, // Increment by 1
    { new: true } // Return the updated document
  );

  return res;
};

const scheduleService = {
  addSchedule,
  getAllSchedule,
  getLiveQuizById,
  getTotalScheduleQuiz,
  updateLiveQuizById,
};

module.exports = scheduleService;
