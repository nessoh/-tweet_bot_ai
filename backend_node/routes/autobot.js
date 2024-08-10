const express = require('express');
const { Autobot, Post, Comment } = require('../models');
const router = express.Router();

// Middleware for rate limiting
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5, // Limit each IP to 5 requests per windowMs
});

router.use(limiter);

// Get all Autobots
router.get('/', async (req, res) => {
  const autobots = await Autobot.findAll({ limit: 10 });
  res.json(autobots);
});

// Get posts by Autobot
router.get('/:id/posts', async (req, res) => {
  const posts = await Post.findAll({ where: { AutobotId: req.params.id }, limit: 10 });
  res.json(posts);
});

// Get comments by Post
router.get('/posts/:id/comments', async (req, res) => {
  const comments = await Comment.findAll({ where: { PostId: req.params.id }, limit: 10 });
  res.json(comments);
});

module.exports = router;
