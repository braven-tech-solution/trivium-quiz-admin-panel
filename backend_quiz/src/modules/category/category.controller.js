const catchAsync = require("../../shared/catchAsync");
const sendResponse = require("../../shared/sendResponse");
const categoryService = require("./category.service");

const addCategory = catchAsync(async (req, res) => {
  const payload = { ...req.body };
  if (req.files) {
    if (req.files.image) {
      const image = req.files.image[0].filename;
      payload.image = `/uploads/category/${image}`;
    }
  }

  console.log(payload);

  const category = await categoryService.addCategory(payload);

  if (category) {
    sendResponse(res, 201, true, "Category added successfully", category);
  } else {
    sendResponse(res, 400, false, "Failed to add category", {});
  }
});

const getAllCategory = catchAsync(async (req, res) => {
  const category = await categoryService.getAllCategory();

  if (category) {
    sendResponse(res, 200, true, "Category get successfully", category);
  } else {
    sendResponse(res, 400, false, "Failed to get category", {});
  }
});

const categoryController = {
  addCategory,
  getAllCategory,
};

module.exports = categoryController;
