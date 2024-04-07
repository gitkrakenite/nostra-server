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

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    categories: [
      {
        type: String,
        required: true,
      },
    ],
    sizes: [
      {
        type: String,
        required: true,
      },
    ],
    availableColors: [
      {
        type: String,
        required: true,
      },
    ],
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },

    onOffer: {
      type: String,
      default: "no",
    },

    trending: {
      type: String,
      default: "no",
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

    vendor: {
      type: String,
      required: true,
      default: "nike",
    },

    quantity: {
      type: Number,
      required: true,
    },

    available: {
      type: Boolean,
      default: true,
    },

    comments: [commentSchema],
    likes: [likeSchema],
  },
  { timestamps: true }
);

const Product = mongoose.model("product", productSchema);

module.exports = Product;
