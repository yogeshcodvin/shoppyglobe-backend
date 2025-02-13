const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

// GET all products (with optional category filtering)
router.get("/", async (req, res) => {
    try {
        const { category } = req.query; // ?category=furniture
        const products = category ? await Product.find({ category }) : await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Error fetching products", error });
    }
});

// GET single product by ID
router.get("/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: "Error fetching product", error });
    }
});

// Route to add multiple products at once with validation
router.post("/bulk", async (req, res) => {
    try {
        const products = req.body;

        // Ensure request body is an array
        if (!Array.isArray(products) || products.length === 0) {
            return res.status(400).json({ error: "Request body must be an array of products." });
        }

        // Validate each product before inserting
        for (const product of products) {
            const newProduct = new Product(product);
            await newProduct.validate(); // Manually validate each product
        }

        // Insert all products after validation
        const insertedProducts = await Product.insertMany(products, { ordered: false });

        res.status(201).json({
            message: `${insertedProducts.length} products added successfully!`,
            products: insertedProducts
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
