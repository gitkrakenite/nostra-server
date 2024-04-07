const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    profile: { type: String, required: true },
    isPaid: { type: String, default: "nope", required: true },
    isAdmin: { type: String, default: "nope", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
