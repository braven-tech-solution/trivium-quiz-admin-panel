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
    serial: {
      type: Number,
      default: "",
    },
    status: {
      type: String,
      enum: ["active", "deactive", "deleted"],
      default: "active",
    },
  },
  { timestamps: true }
);

const Schedule = model("Schedule", scheduleSchema);
module.exports = Schedule;
