const NodeCache = require("node-cache");
const Level = require("./level.model.js");

const nodeCache = new NodeCache();

const addLevel = async (payload) => {
  const savedLevel = await Level.create(payload);
  nodeCache.flushAll();
  return savedLevel;
};

const getAllLevelByCategoryId = async (categoryId) => {
  const getLevel = await Level.find({ category: categoryId });
  // nodeCache.flushAll();
  return getLevel;
};

const levelService = {
  addLevel,
  getAllLevelByCategoryId,
};

module.exports = levelService;
