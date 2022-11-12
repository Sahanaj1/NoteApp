const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    desc: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    percentage: {
      type: Number,
      required: true,
      default:0
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);