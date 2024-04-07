const express = require("express");
const {
  createReceipt,
  fetchAllReceipts,
  fetchMyReceipts,
  deleteAllReceipts,
  deleteSpecificReceipt,
} = require("../controllers/receiptController");
const router = express.Router();

router.post("/", createReceipt);
router.get("/", fetchAllReceipts);
router.post("/mine", fetchMyReceipts);
router.delete("/", deleteAllReceipts);
router.delete("/:id", deleteSpecificReceipt);

module.exports = router;
