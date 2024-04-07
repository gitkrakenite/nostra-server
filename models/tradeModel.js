const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    profile: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const likeSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
});

const dislikeSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
});

const tradeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    exchange: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    fPhoto: {
      type: String,
      required: true,
    },

    sPhoto: {
      type: String,
      required: true,
    },

    tPhoto: {
      type: String,
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
    },

    vendor: {
      type: String,
      required: true,
      default: "nike",
    },

    available: {
      type: Boolean,
      required: true,
      default: true,
    },

    comments: [commentSchema],
    likes: [likeSchema],
    dislikes: [dislikeSchema],
  },
  { timestamps: true }
);

const Trade = mongoose.model("trade", tradeSchema);

module.exports = Trade;
