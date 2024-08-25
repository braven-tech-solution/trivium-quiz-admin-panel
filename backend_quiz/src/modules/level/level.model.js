const { Schema, model } = require("mongoose");

const levelSchema = new Schema(
  {
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    perQuestionMark: {
      type: Number,
      required: [true, "Per Question Mark   is required"],
      default: 1,
    },
    nagativeMark: {
      type: Number,
      default: 0,
    },
    totalMark: {
      type: Number,
      required: [true, "Total mark   Mark   is required"],
    },
    serial: {
      type: Number,
      default: 1,
    },
    status: {
      type: String,
      enum: ["active", "deactive", "deleted"],
      default: "active",
    },
  },
  { timestamps: true }
);

const Level = model("Level", levelSchema);

module.exports = Level;
