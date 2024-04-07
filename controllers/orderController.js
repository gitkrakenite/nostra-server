const Order = require("../models/orderModel");
const User = require("../models/userModel");

// create order
const createOrder = async (req, res) => {
  try {
    const orderData = req.body; //order data

    // Create a new order document
    const order = new Order(orderData);

    // Save the order to the database
    await order.save();

    res.status(201).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

const fetchOrders = async (req, res, next) => {
  try {
    const order = await Order.find().sort({ $natural: -1 });
    res.status(200).send(order);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const fetchMyOrders = async (req, res, next) => {
  const { username } = req.body;
  if (!username) {
    return res.status(400).send("no username");
  }

  const user = await User.findOne({ username: username });

  if (user) {
    try {
      const order = await Order.find({ username }).sort({ $natural: -1 });
      res.status(200).send(order);
    } catch (error) {
      res.status(500).send(error.message);
    }
  } else {
    res.status(400).send("username not found");
  }
};

const deleteOrder = async (req, res, next) => {
  // check if order exist

  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(400).json({ message: "order not found" });
    return;
  }

  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json({ id: req.params.id });
  } catch (error) {
    res.status(400).json({ message: "Could not delete order" });
  }
  // console.log(req.params);
};

const fetchSpecificOrder = async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.id });
    res.status(200).send(order);
  } catch (error) {
    res.status(500).send("Action Failed");
  }
};

const updateSpecificOrder = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = {
  createOrder,
  fetchOrders,
  fetchSpecificOrder,
  deleteOrder,
  updateSpecificOrder,
  fetchMyOrders,
};
