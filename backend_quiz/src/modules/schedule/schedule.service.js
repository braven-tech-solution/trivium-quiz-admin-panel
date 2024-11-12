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

const getRunningLiveQuiz = async () => {
  const schedule = await Schedule.findOne({
    startTime: { $lte: now },
    endTime: { $gte: now },
  });
  return schedule;
};

const getTotalScheduleQuiz = async (email, phone) => {
  const totalUserCount = await Schedule.countDocuments({});
  return totalUserCount;
};

const updateLiveQuizById = async (livelId, payload) => {
  console.log({ livelId });
  console.log(payload);
  const res = await Schedule.findByIdAndUpdate(
    livelId,
    payload,
    { new: true } // Return the updated document
  );

  return res;
};

const updateNumberOfQuestionsOfSchedule = async (scheduleId) => {
  console.log({ scheduleId });
  const res = await Schedule.findByIdAndUpdate(
    scheduleId,
    { $inc: { numberOfQuestion: 1 } }, // Increment by 1
    { new: true } // Return the updated document
  );

  return res;
};

const deleteiveQuizById = async (scheduleId) => {
  // console.log({ scheduleId });
  const res = await Schedule.findByIdAndDelete(scheduleId);

  return res;
};

const scheduleService = {
  addSchedule,
  getAllSchedule,
  getLiveQuizById,
  getRunningLiveQuiz,
  getTotalScheduleQuiz,
  updateLiveQuizById,
  updateNumberOfQuestionsOfSchedule,
  deleteiveQuizById,
};

module.exports = scheduleService;
