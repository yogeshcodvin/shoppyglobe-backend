const express = require("express");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

/** ADD PRODUCT TO CART */
router.post("/", authMiddleware, async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const userId = req.user.userId;

        // Check if product exists
        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: "Product not found" });

        // Check if user has a cart
        let cart = await Cart.findOne({ userId });

        if (!cart) {
            cart = new Cart({ userId, items: [{ productId, quantity }] });
        } else {
            const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += quantity;
            } else {
                cart.items.push({ productId, quantity });
            }
        }

        await cart.save();
        res.status(201).json({ message: "Product added to cart", cart });
    } catch (error) {
        res.status(500).json({ message: "Error adding to cart", error });
    }
});

/** GET CART ITEMS */
router.get("/", authMiddleware, async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user.userId }).populate("items.productId");
        if (!cart) return res.status(404).json({ message: "Cart is empty" });

        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: "Error fetching cart", error });
    }
});

/** UPDATE CART ITEM QUANTITY */
router.put("/:productId", authMiddleware, async (req, res) => {
    try {
        const { productId } = req.params;
        const { quantity } = req.body;
        const userId = req.user.userId;

        let cart = await Cart.findOne({ userId });
        if (!cart) return res.status(404).json({ message: "Cart not found" });

        const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
        if (itemIndex === -1) return res.status(404).json({ message: "Product not in cart" });

        cart.items[itemIndex].quantity = quantity;
        await cart.save();

        res.json({ message: "Cart updated", cart });
    } catch (error) {
        res.status(500).json({ message: "Error updating cart", error });
    }
});

/** REMOVE PRODUCT FROM CART */
router.delete("/:productId", authMiddleware, async (req, res) => {
    try {
        const { productId } = req.params;
        const userId = req.user.userId;

        let cart = await Cart.findOne({ userId });
        if (!cart) return res.status(404).json({ message: "Cart not found" });

        cart.items = cart.items.filter(item => item.productId.toString() !== productId);
        await cart.save();

        res.json({ message: "Product removed from cart", cart });
    } catch (error) {
        res.status(500).json({ message: "Error removing product from cart", error });
    }
});

module.exports = router;
