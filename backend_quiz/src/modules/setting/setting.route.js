const express = require("express");

const settingsController = require("./setting.controller.js");

const settingsRouter = express.Router();

settingsRouter
  .post("", settingsController.addSetting)
  .get("", settingsController.getAllSettings)
  .patch("", settingsController.updateSetting);

module.exports = settingsRouter;
