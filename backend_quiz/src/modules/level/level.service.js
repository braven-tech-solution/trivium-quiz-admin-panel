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

const getSingleLeveById = async (levelId) => {
  const res = await Level.findById(levelId);

  return res;
};

const getAllLevel = async () => {
  // console.log({ object: categoryId });
  const getLevel = await Level.find({});
  // console.log({ getLevel });
  // nodeCache.flushAll();
  return getLevel;
};

const updateLevelById = async (levelId, payload) => {
  console.log({ levelId });
  const res = await Level.findByIdAndUpdate(
    levelId,
    payload, // Increment by 1
    { new: true } // Return the updated document
  );

  return res;
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

const updateLevel = async (levelId, payload) => {
  const result = await Level.findByIdAndUpdate(levelId, payload, {
    new: true,
  });
  // nodeCache.flushAll();
  return result;
};

const levelService = {
  addLevel,
  getAllLevelByCategoryId,
  getSingleLeveById,
  getAllLevel,
  updateLevelById,
  updateNumberOfQuestions,
  updateLevel,
};

module.exports = levelService;
