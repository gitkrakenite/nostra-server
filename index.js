const express = require("express");
const cors = require("cors");
const colors = require("colors");
const dotenv = require("dotenv").config();

const connectDB = require("./config/db");
const userRouter = require("./routes/userRoutes");
const productRouter = require("./routes/productRoutes");
const orderRouter = require("./routes/orderRoutes");
const receiptsRouter = require("./routes/receiptRoutes");
const tradeRouter = require("./routes/tradeRouter");

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// DB connection
connectDB();

// routes
app.get("/", (req, res) => res.status(200).send("API WORKING WELL"));

app.use("/api/v1/users", userRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/trade", tradeRouter);
app.use("/api/v1/receipts", receiptsRouter);

// listener
app.listen(PORT, console.log(`Server running on port: ${PORT}`));
