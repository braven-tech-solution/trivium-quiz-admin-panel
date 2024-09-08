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

const updateNumberOfQuestions = async (levelId) => {
  console.log({ levelId });
  const res = await Level.findByIdAndUpdate(
    levelId,
    { $inc: { numberOfQuestion: 1 } }, // Increment by 1
    { new: true } // Return the updated document
  );

  return res;
};

const levelService = {
  addLevel,
  getAllLevelByCategoryId,
  getAllLevel,
  updateNumberOfQuestions,
};

module.exports = levelService;
