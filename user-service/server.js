
const express = require("express");
const rateLimit = require("express-rate-limit");

const app = express();
const PORT = 3001;


const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  limit: 5,             // Maximum 5 requests per window
  message: {
    error: "Too many requests. Please try again in a minute."
  },
  standardHeaders: "draft-8",
  legacyHeaders: false
});

app.use(limiter);


// Sample user data (no database needed)
const users = [
  { id: 1, name: "Aakash", role: "Developer" },
  { id: 2, name: "Rahul", role: "Designer" }
];

// Basic User API
app.get("/users", (req, res) => {
  res.json({
    message: "Users fetched successfully",
    users: users
  });
});


app.get("/users/:id/products", async (req, res) => {
  try {
    const userId = Number(req.params.id);

    const user = users.find((u) => u.id === userId);

    if (!user) {
      return res.status(404).json({
        error: "User not found"
      });
    }

    // HTTP request from User Service to Product Service
    const response = await fetch("http://localhost:3002/products");

    if (!response.ok) {
      throw new Error("Product Service returned an error");
    }

    const productData = await response.json();

    res.json({
      message: "User and product data fetched successfully",
      user: user,
      products: productData.products
    });
  } catch (error) {
    console.error("Product Service request failed:", error.message);

    res.status(502).json({
      error: "Unable to communicate with Product Service"
    });
  }
});


// Health check
app.get("/health", (req, res) => {
  res.json({ status: "User Service is running" });
});

// Start User Service
app.listen(PORT, () => {
  console.log(`User Service running at http://localhost:${PORT}`);
});
