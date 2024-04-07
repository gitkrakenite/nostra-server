const express = require("express");
const router = express.Router();

const {
  createTrade,
  fetchAllTrades,
  categoryFetch,
  fetchSpecificTrade,
  deleteTrade,
  commentOnTrade,
  likeATrade,
  dislikeATrade,
  updateSpecificTrade,
} = require("../controllers/tradeController");

const { protect } = require("../middlewares/authMiddleware");

router.post("/", protect, createTrade);
router.put("/:id", protect, updateSpecificTrade);
router.delete("/:id", protect, deleteTrade);
router.post("/comment/:id", protect, commentOnTrade);
router.post("/like/:id", protect, likeATrade);
router.post("/dislike/:id", protect, dislikeATrade);
router.get("/", fetchAllTrades);
router.get("/:id", fetchSpecificTrade);
router.post("/maincat", categoryFetch);

module.exports = router;
