const Product = require("../models/productModel");
const User = require("../models/userModel");

// create product
const createProduct = async (req, res) => {
  const {
    title,
    mainCat,
    subCat,
    price,
    description,
    onOffer,
    fPhoto,
    sPhoto,
    tPhoto,
    vendor,
    quantity,
    available,
  } = req.body;

  const requiredFields = [
    "title",
    "mainCat",
    "subCat",
    "price",
    "description",
    "onOffer",
    "fPhoto",
    "sPhoto",
    "tPhoto",
    "vendor",
    "quantity",
    "available",
  ];

  for (const field of requiredFields) {
    if (!req.body[field]) {
      res.status(400).send(`Missing required field: ${field}`);
      return;
    }
  }

  try {
    const product = await Product.create({
      title,
      mainCat,
      subCat,
      price,
      description,
      onOffer,
      fPhoto,
      sPhoto,
      tPhoto,
      vendor,
      quantity,
      available,
    });

    if (product) {
      res.status(201).send(product);
      return;
    }
  } catch (error) {
    res.status(500).send("something went wrong: " + e);
  }
};

// Function to shuffle products randomly
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

const fetchAllProducts = async (req, res, next) => {
  try {
    // Get all product items from the database
    const allProducts = await Product.find();

    // Randomly shuffle the products
    const shuffledProducts = shuffleArray(allProducts);

    res.status(200).send(shuffledProducts);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteProduct = async (req, res, next) => {
  // check if product exist
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(400).json({ message: "product not found" });
    return;
  }
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ id: req.params.id });
  } catch (error) {
    res.status(400).json({ message: "Could not delete product" });
  }
  // console.log(req.params);
};

const mainCategoryFetch = async (req, res) => {
  const { mainCat } = req.body;
  try {
    const product = await Product.find({
      mainCat,
    });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).send(error);
  }
};

const subCategoryFetch = async (req, res) => {
  const { subCat } = req.body;
  try {
    const product = await Product.find({
      subCat,
    });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).send(error);
  }
};

const fetchOnOffer = async (req, res) => {
  const { onOffer } = req.body;
  try {
    const product = await Product.find({
      onOffer,
    });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).send(error);
  }
};

const fetchTrending = async (req, res) => {
  const { trending } = req.body;
  try {
    const product = await Product.find({
      trending,
    });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).send(error);
  }
};

const commentOnProduct = async (req, res) => {
  try {
    const { username, profile, comment } = req.body;

    // Find the product to be commented on by ID
    const product = await Product.findById(req.params.id);

    // find if the username exists
    const user = await User.findOne({ username });

    // If the product doesn't exist, return an error
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // If the user doesn't exist, return an error
    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }

    // Create a new comment
    const newComment = {
      username,
      profile,
      comment,
    };

    // Add the comment to the product's comments array
    product.comments.push(newComment);

    // Save the updated post with the new comment
    await product.save();
    res
      .status(201)
      .json({ message: "Comment added successfully", comment: newComment });
  } catch (error) {
    res.status(500).json({ error: "Failed To Comment" });
  }
};

const likeAProduct = async (req, res) => {
  try {
    const { username } = req.body;

    // Find the product item by ID
    const product = await Product.findById(req.params.id);

    // If the product doesn't exist, return an error
    if (!product) {
      return res.status(404).json({ error: "product not found" });
    }

    // Find if the username exists
    const user = await User.findOne({ username });
    // If the user doesn't exist, return an error
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the user has already liked this product
    const hasLiked = product.likes.some((like) => like.username === username);

    if (hasLiked) {
      // If the user has already liked it, remove their like
      product.likes = product.likes.filter(
        (like) => like.username !== username
      );
      await product.save();
      res.status(200).json({ message: "Unliked successfully" });
    } else {
      // If the user hasn't liked it yet, add their like
      const newLike = {
        username,
      };
      product.likes.push(newLike);
      await product.save();
      res.status(201).json({ message: "Liked successfully" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed To Like" });
  }
};

const fetchSpecificProduct = async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id });
    res.status(200).send(product);
  } catch (error) {
    res.status(500).send("Action Failed");
  }
};

const updateSpecificProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = {
  createProduct,
  fetchAllProducts,
  fetchOnOffer,
  fetchTrending,
  fetchSpecificProduct,
  mainCategoryFetch,
  subCategoryFetch,
  deleteProduct,
  commentOnProduct,
  likeAProduct,
  updateSpecificProduct,
};
