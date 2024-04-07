const express = require("express");
const router = express.Router();

const {
  createOrder,
  updateSpecificOrder,
  fetchOrders,
  deleteOrder,
  fetchSpecificOrder,
  fetchMyOrders,
} = require("../controllers/orderController");

router.post("/", createOrder);
router.put("/:id", updateSpecificOrder);
router.get("/", fetchOrders);
router.post("/mine", fetchMyOrders);
router.delete("/:id", deleteOrder);
router.get("/:id", fetchSpecificOrder);

module.exports = router;
