const NodeCache = require("node-cache");
const Level = require("./level.model.js");

const nodeCache = new NodeCache();

const addLevel = async (payload) => {
  const savedLevel = await Level.create(payload);
  nodeCache.flushAll();
  return savedLevel;
};

const getAllLevelByCategoryId = async (categoryId) => {
  // console.log({ object: categoryId });
  const getLevel = await Level.find({ category: categoryId });
  // console.log({ getLevel });
  // nodeCache.flushAll();
  return getLevel;
};

const getAllLevel = async () => {
  // console.log({ object: categoryId });
  const getLevel = await Level.find({});
  // console.log({ getLevel });
  // nodeCache.flushAll();
  return getLevel;
};

const levelService = {
  addLevel,
  getAllLevelByCategoryId,
  getAllLevel,
};

module.exports = levelService;
