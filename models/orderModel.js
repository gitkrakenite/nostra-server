const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    newPhone: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    moreInfo: {
      type: String,
    },

    progress: {
      type: String,
      required: true,
      default: "received",
    },

    product: [],
  },
  { timestamps: true }
);

const order = mongoose.model("Order", orderSchema);

module.exports = order;
