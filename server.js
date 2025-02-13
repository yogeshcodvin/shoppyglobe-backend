require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");


const productRoutes = require("./routes/ProductRoutes.js");
const cartRoutes = require("./routes/CartRoutes.js");
const authRoutes = require("./routes/AuthRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected successfully! ✅");
    } catch (error) {
        console.error("MongoDB Connection Error:", error);
        process.exit(1); // Exit process on failure
    }
};

connectDB();

// Routes
app.use("/products", productRoutes);



app.use("/cart", cartRoutes);



app.use("/auth", authRoutes);



// Default Route
app.get("/", (req, res) => {
    res.send("ShoppyGlobe API is running...");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
