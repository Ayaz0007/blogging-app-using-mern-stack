require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const authRoutes = require("./routes/authRoutes");
const multer = require("multer");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Serve uploaded images

// MongoDB connection
console.log("MongoDB URI:", process.env.MONGODB_URI);
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB", err));

// Post schema with image and category support
const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  image: String,
  category: String, // <-- Add category field
  createdAt: { type: Date, default: Date.now },
});

const Post = mongoose.model("Post", postSchema);

// Multer setup for file upload

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // folder where files will be stored
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

const upload = multer({ storage: storage });

// Get all posts (with optional category filter)
app.get("/posts", async (req, res) => {
  try {
    const { category } = req.query;
    let filter = {};
    if (category) {
      filter.category = category;
    }
    const posts = await Post.find(filter).sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new post
app.post("/posts", upload.single("image"), async (req, res) => {
  const { title, content, category } = req.body; // <-- Get category from request
  const imagePath = req.file ? req.file.filename : null;

  if (!title || !content) {
    return res.status(400).json({ message: "Title and content are required" });
  }

  const post = new Post({
    title,
    content,
    image: imagePath,
    category, // <-- Save category
    createdAt: new Date(),
  });

  try {
    const newPost = await post.save();
    res.status(201).json(newPost);
  } catch (err) {
    console.error("Error saving post:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get single post
app.get("/posts/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update post
app.put("/posts/:id", async (req, res) => {
  const { title, content } = req.body;
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );
    res.json(updatedPost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete a post by ID
app.delete("/posts/:id", async (req, res) => {
  const postId = req.params.id;
  console.log("Deleting post with ID:", postId);
  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    await post.deleteOne();
    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Auth routes
app.use("/auth", authRoutes);

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
