const Trade = require("../models/tradeModel");
const User = require("../models/userModel");

// create trade
const createTrade = async (req, res) => {
  const {
    title,
    category,
    exchange,
    description,
    fPhoto,
    sPhoto,
    tPhoto,
    vendor,
    quantity,
  } = req.body;

  const requiredFields = [
    "title",
    "category",
    "exchange",
    "description",
    "fPhoto",
    "sPhoto",
    "tPhoto",
    "vendor",
    "quantity",
  ];

  for (const field of requiredFields) {
    if (!req.body[field]) {
      res.status(400).send(`Missing required field: ${field}`);
      return;
    }
  }

  try {
    const trade = await Trade.create({
      title,
      category,
      exchange,
      description,
      fPhoto,
      sPhoto,
      tPhoto,
      vendor,
      quantity,
    });

    if (trade) {
      res.status(201).send(trade);
      return;
    }
  } catch (error) {
    res.status(500).send("something went wrong: " + e);
  }
};

// Function to shuffle trades randomly
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

const fetchAllTrades = async (req, res, next) => {
  try {
    const allTrades = await Trade.find();

    // Randomly shuffle the trades
    const shuffledTrades = shuffleArray(allTrades);

    res.status(200).send(shuffledTrades);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteTrade = async (req, res, next) => {
  // check if trade exist
  const trade = await Trade.findById(req.params.id);
  if (!trade) {
    res.status(400).json({ message: "trade not found" });
    return;
  }
  try {
    await Trade.findByIdAndDelete(req.params.id);
    res.status(200).json({ id: req.params.id });
  } catch (error) {
    res.status(400).json({ message: "Could not delete trade" });
  }
};

const categoryFetch = async (req, res) => {
  const { category } = req.body;
  try {
    const trade = await Trade.find({
      category,
    });
    res.status(200).json(trade);
  } catch (error) {
    res.status(500).send(error);
  }
};

const commentOnTrade = async (req, res) => {
  try {
    const { username, profile, comment } = req.body;

    // Find the trade to be commented on by ID
    const trade = await Trade.findById(req.params.id);

    // find if the username exists
    const user = await User.findOne({ username });

    // If the trade doesn't exist, return an error
    if (!trade) {
      return res.status(404).json({ error: "trade not found" });
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

    // Add the comment to the trade's comments array
    trade.comments.push(newComment);

    // Save the updated trade with the new comment
    await trade.save();
    res
      .status(201)
      .json({ message: "Comment added successfully", comment: newComment });
  } catch (error) {
    res.status(500).json({ error: "Failed To Comment" });
  }
};

const likeATrade = async (req, res) => {
  try {
    const { username } = req.body;

    // Find the trade item by ID
    const trade = await Trade.findById(req.params.id);

    // If the trade doesn't exist, return an error
    if (!trade) {
      return res.status(404).json({ error: "trade not found" });
    }

    // Find if the username exists
    const user = await User.findOne({ username });
    // If the user doesn't exist, return an error
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the user has already liked this trade
    const hasLiked = trade.likes.some((like) => like.username === username);

    if (hasLiked) {
      // If the user has already liked it, remove their like
      trade.likes = trade.likes.filter((like) => like.username !== username);
      await trade.save();
      res.status(200).json({ message: "Unliked successfully" });
    } else {
      // If the user hasn't liked it yet, add their like
      const newLike = {
        username,
      };
      trade.likes.push(newLike);
      await trade.save();
      res.status(201).json({ message: "Liked successfully" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed To Like" });
  }
};

const dislikeATrade = async (req, res) => {
  try {
    const { username } = req.body;

    // Find the trade item by ID
    const trade = await Trade.findById(req.params.id);

    // If the trade doesn't exist, return an error
    if (!trade) {
      return res.status(404).json({ error: "trade not found" });
    }

    // Find if the username exists
    const user = await User.findOne({ username });
    // If the user doesn't exist, return an error
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the user has already disliked this trade
    const hasDisLiked = trade.dislikes.some(
      (dislike) => dislike.username === username
    );

    if (hasDisLiked) {
      // If the user has already disliked it, remove their dislike
      trade.dislikes = trade.dislikes.filter(
        (dislike) => dislike.username !== username
      );
      await trade.save();
      res.status(200).json({ message: "Removed Dislike" });
    } else {
      // If the user hasn't disliked it yet, add their dislike
      const newDisLike = {
        username,
      };
      trade.dislikes.push(newDisLike);
      await trade.save();
      res.status(201).json({ message: "Dislikes successfully" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed To Dislike" });
  }
};

const fetchSpecificTrade = async (req, res) => {
  try {
    const trade = await Trade.findOne({ _id: req.params.id });
    res.status(200).send(trade);
  } catch (error) {
    res.status(500).send("Action Failed");
  }
};

const updateSpecificTrade = async (req, res) => {
  try {
    const updatedTrade = await Trade.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json(updatedTrade);
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = {
  createTrade,
  fetchAllTrades,
  categoryFetch,
  fetchSpecificTrade,
  deleteTrade,
  commentOnTrade,
  likeATrade,
  dislikeATrade,
  updateSpecificTrade,
};
