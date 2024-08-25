const { Schema, model } = require("mongoose");

const questionSchema = new Schema(
  {
    model_type: {
      type: String,
      required: true,
      enum: ["Schedule", "Level"],
    },
    model_id: {
      type: Schema.Types.ObjectId,
      required: true,
      refPath: "type_Model",
    },
    title: {
      type: String,
      required: [true, "title is required"],
    },
    serial: {
      type: Number,
      default: "",
    },
    option1: {
      type: String,
      required: true,
    },
    option2: {
      type: String,
      required: true,
    },
    option3: {
      type: String,
      required: true,
    },
    option4: {
      type: String,
      required: true,
    },
    correctAnswer: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "deactive", "deleted"],
      default: "active",
    },
  },
  { timestamps: true }
);

const Question = model("Question", questionSchema);

module.exports = Question;
