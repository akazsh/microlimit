
const express = require("express");

const app = express();
const PORT = 3002;

// Sample product data (no database needed)
const products = [
  { id: 1, name: "Laptop", price: 50000 },
  { id: 2, name: "Headphones", price: 2000 },
  { id: 3, name: "Keyboard", price: 1500 }
];

// Products API
app.get("/products", (req, res) => {
  res.json({
    message: "Products fetched successfully",
    products: products
  });
});

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "Product Service is running" });
});

app.listen(PORT, () => {
  console.log(`Product Service running at http://localhost:${PORT}`);
});
