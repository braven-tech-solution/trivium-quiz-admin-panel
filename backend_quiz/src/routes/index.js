const express = require("express");
const userRouter = require("../modules/user/user.route");
const categoryRouter = require("../modules/category/category.route");
const levelRouter = require("../modules/level/level.route");
const questionRouter = require("../modules/question/question.route");
const scheduleRouter = require("../modules/schedule/schedule.route");

const rootRouter = express.Router();

const moduleRoutes = [
  { path: "/users", router: userRouter },
  { path: "/category", router: categoryRouter },
  { path: "/level", router: levelRouter },
  { path: "/question", router: questionRouter },
  { path: "/schedule", router: scheduleRouter },
];

moduleRoutes.forEach((route) => {
  rootRouter.use(route.path, route.router);
});

module.exports = rootRouter;
