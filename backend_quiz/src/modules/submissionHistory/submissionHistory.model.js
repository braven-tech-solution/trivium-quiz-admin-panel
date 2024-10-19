const { Schema, model } = require("mongoose");

const submissionHistorySchema = new Schema(
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
      type: Number,
      required: true,
    },
    answer: [
      {
        questionId: {
          type: Schema.Types.ObjectId,
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

const SubmissionHistory = model("SubmissionHistory", submissionHistorySchema);
module.exports = SubmissionHistory;
