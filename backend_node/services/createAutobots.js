const axios = require('axios');
const { Autobot, Post, Comment } = require('../models');

async function createAutobots() {
  try {
    for (let i = 0; i < 500; i++) {
      const user = (await axios.get('https://jsonplaceholder.typicode.com/users')).data[i % 10];
      const autobot = await Autobot.create({
        name: user.name,
        username: user.username,
        email: user.email,
      });

      for (let j = 0; j < 10; j++) {
        const post = (await axios.get('https://jsonplaceholder.typicode.com/posts')).data[j];
        const createdPost = await Post.create({
          title: `${post.title} ${i}-${j}`,
          body: post.body,
          AutobotId: autobot.id,
        });

        for (let k = 0; k < 10; k++) {
          const comment = (await axios.get('https://jsonplaceholder.typicode.com/comments')).data[k];
          await Comment.create({
            name: comment.name,
            email: comment.email,
            body: comment.body,
            PostId: createdPost.id,
          });
        }
      }
    }
  } catch (error) {
    console.error('Error creating Autobots:', error);
  }
}

module.exports = createAutobots;
