const { Schema, model } = require("mongoose");

const scheduleSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Schedule quiz name is required"],
    },
    description: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      default: "",
    },
    startTime: {
      type: Date,
      default: "",
    },
    endTime: {
      type: Date,
      default: "",
    },
    numberOfQuestion: {
      type: Number,
      default: 0,
    },
    perQuestionMark: {
      type: Number,
      required: [true, "Per Question Mark   is required"],
      default: 1,
    },
    negativeAnswerMark: {
      type: Number,
      default: 0,
    },
    priority: {
      type: Number,
      default: 1,
    },
    status: {
      type: String,
      enum: ["active", "deactive", "deleted"],
      default: "active",
    },
    point: {
      type: Number,
      default: 0,
    },
    averageStrength: {
      type: Number,
      default: 0,
    },
    totalCompleteQuiz: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Schedule = model("Schedule", scheduleSchema);
module.exports = Schedule;
