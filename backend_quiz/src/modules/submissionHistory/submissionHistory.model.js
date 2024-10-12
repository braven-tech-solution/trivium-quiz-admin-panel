const { Schema, model } = require("mongoose");

const scheduleSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    scheduleId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Schedule",
    },
    correctAnswer: {
      type: String,
      required: true,
    },
    answer: [
      {
        objectId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
        },
        value: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const Schedule = model("Schedule", scheduleSchema);
module.exports = Schedule;
