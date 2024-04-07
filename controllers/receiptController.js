const Receipt = require("../models/receiptModel");
const User = require("../models/userModel");

const createReceipt = async (req, res) => {
  const {
    customerName,
    deliveryAddress,
    foodItems,
    containerFee,
    deliveryFee,
    creator,
    totalPrice,
  } = req.body;

  // Create a new receipt document based on the request data
  const newReceipt = new Receipt({
    customerName,
    deliveryAddress,
    foodItems,
    containerFee,
    deliveryFee,
    creator,
    totalPrice,
  });

  try {
    // Save the receipt document to the database and await the result
    const savedReceipt = await newReceipt.save();
    // console.log("Receipt saved successfully");
    res.status(200).send(savedReceipt);
  } catch (err) {
    console.error("Error saving receipt:", err);
    res.status(500).json({ error: "Error saving receipt" });
  }
};

const fetchAllReceipts = async (req, res, next) => {
  try {
    const receipt = await Receipt.find().sort({ $natural: -1 });
    res.status(200).send(receipt);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const fetchMyReceipts = async (req, res, next) => {
  const { username } = req.body;
  if (!username) {
    return res.status(400).send("no username");
  }

  const user = await User.findOne({ username: username });

  if (user) {
    try {
      const receipt = await Receipt.find({ customerName: username }).sort({
        $natural: -1,
      });
      res.status(200).send(receipt);
    } catch (error) {
      res.status(500).send(error.message);
    }
  } else {
    res.status(400).send("username not found");
  }
};

const deleteAllReceipts = async (req, res, next) => {
  try {
    // Delete all receipts
    await Receipt.deleteMany({});
    res.json({ message: "All receipts have been deleted." });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting receipts." });
  }
};

const deleteSpecificReceipt = async (req, res, next) => {
  const receipt = await Receipt.findById(req.params.id);

  if (!receipt) {
    res.status(400).json({ message: "receipt not found" });
    return;
  }

  try {
    await Receipt.findByIdAndDelete(req.params.id);
    res.status(200).json({ id: req.params.id });
  } catch (error) {
    res.status(400).json({ message: "Could not delete receipt" });
  }
  // console.log(req.params);
};

module.exports = {
  createReceipt,
  fetchAllReceipts,
  fetchMyReceipts,
  deleteAllReceipts,
  deleteSpecificReceipt,
};
