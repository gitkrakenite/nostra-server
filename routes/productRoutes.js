const express = require("express");
const router = express.Router();

const {
  createProduct,
  fetchAllProducts,
  fetchOnOffer,
  fetchTrending,
  fetchSpecificProduct,
  deleteProduct,
  commentOnProduct,
  likeAProduct,
  updateSpecificProduct,
  categoryFetchProducts,
} = require("../controllers/productController");

const { protect } = require("../middlewares/authMiddleware");

router.post("/", protect, createProduct);
router.put("/:id", protect, updateSpecificProduct);
router.delete("/:id", protect, deleteProduct);
router.post("/comment/:id", protect, commentOnProduct);
router.post("/like/:id", protect, likeAProduct);
router.get("/", fetchAllProducts);
router.get("/:id", fetchSpecificProduct);
router.post("/cat", categoryFetchProducts);
router.post("/offer", fetchOnOffer);
router.post("/trending", fetchTrending);

module.exports = router;
