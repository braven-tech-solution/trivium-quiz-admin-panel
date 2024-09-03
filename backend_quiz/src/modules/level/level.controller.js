const catchAsync = require("../../shared/catchAsync");
const sendResponse = require("../../shared/sendResponse");
const levelService = require("./level.service.js");

const addLevel = catchAsync(async (req, res) => {
  const payload = { ...req.body };

  if (req.files) {
    if (req.files.image) {
      const image = req.files.image[0].filename;
      payload.image = `/uploads/level/${image}`;
    }
  }

  const quiz = await levelService.addLevel(payload);

  if (quiz) {
    sendResponse(res, 200, true, "level added successfully", quiz);
  } else {
    sendResponse(res, 400, false, "Failed to add level", {});
  }
});

const getAllLevelByCategoryId = catchAsync(async (req, res) => {
  const { categoryId } = req.params;

  // console.log({ categoryId });
  const level = await levelService.getAllLevelByCategoryId(categoryId);

  if (level) {
    sendResponse(res, 200, true, "Level get successfully", level);
  } else {
    sendResponse(res, 400, false, "Failed to get level", {});
  }
});

const getAllLevel = catchAsync(async (req, res) => {
  const level = await levelService.getAllLevel();

  if (level) {
    sendResponse(res, 200, true, "Level get successfully", level);
  } else {
    sendResponse(res, 400, false, "Failed to get level", {});
  }
});

const levelController = {
  addLevel,
  getAllLevelByCategoryId,
  getAllLevel,
};

module.exports = levelController;
