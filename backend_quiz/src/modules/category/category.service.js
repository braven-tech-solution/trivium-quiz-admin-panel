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

const updateCategory = async (categoryId, payload) => {
  const result = await Category.findByIdAndUpdate(categoryId, payload, {
    new: true,
  });
  // nodeCache.flushAll();
  return result;
};

const categoryService = {
  addCategory,
  getAllCategory,
  updateCategory,
};

module.exports = categoryService;
