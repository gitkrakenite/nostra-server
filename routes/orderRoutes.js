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

const { protect } = require("../middlewares/authMiddleware");

router.post("/", protect, createOrder);
router.put("/:id", protect, updateSpecificOrder);
router.get("/", protect, fetchOrders);
router.post("/mine", protect, fetchMyOrders);
router.delete("/:id", protect, deleteOrder);
router.get("/:id", protect, fetchSpecificOrder);

module.exports = router;
