const express = require("express");
const router = express.Router();
const db = require("../db");

// GET all products
router.get("/", (req, res) => {
  db.query("SELECT * FROM products", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

// ADD product
router.post("/", (req, res) => {
  const { name, price } = req.body;

  db.query(
    "INSERT INTO products (name, price) VALUES (?, ?)",
    [name, price],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Product added" });
    }
  );
});

module.exports = router;