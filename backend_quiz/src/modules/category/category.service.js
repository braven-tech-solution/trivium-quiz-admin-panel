const Category = require("./category.model");
// const NodeCache = require("node-cache");

// const nodeCache = new NodeCache();

const addCategory = async (payload) => {
  const savedCategory = await Category.create(payload);
  // nodeCache.flushAll();
  return savedCategory;
};

const getAllCategory = async (payload) => {
  const getCategory = await Category.find({});
  // nodeCache.flushAll();
  return getCategory;
};

const categoryService = {
  addCategory,
  getAllCategory,
};

module.exports = categoryService;
