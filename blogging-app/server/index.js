// server/index.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/blog", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  createdAt: { type: Date, default: Date.now }
});

const Post = mongoose.model("Post", postSchema);

app.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/posts", async (req, res) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    createdAt: new Date() // Set createdAt field to current date and time
  });

  console.log("Post createdAt:", post.createdAt); // Log createdAt value

  try {
    const newPost = await post.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Deleting Posts using id
app.delete("/posts/:id", async (req, res) => {
  const postId = req.params.id;
  console.log("Deleting post with ID:", postId);
  try {
    const post = await Post.findById(postId);
    console.log("Found post:", post);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    await post.deleteOne();
    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Routes
app.use("/auth", require("./routes/authRoutes"));

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
