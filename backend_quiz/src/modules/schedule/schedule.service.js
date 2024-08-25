const Schedule = require("./schedule.model");
// const NodeCache = require("node-cache");

// const nodeCache = new NodeCache();

const addSchedule = async (payload) => {
  const savedSchedule = await Schedule.create(payload);
  // nodeCache.flushAll();
  return savedSchedule;
};

const getAllSchedule = async (payload) => {
  const getSchedule = await Schedule.find({});
  // nodeCache.flushAll();
  return getSchedule;
};

const scheduleService = {
  addSchedule,
  getAllSchedule,
};

module.exports = scheduleService;
