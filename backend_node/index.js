const express = require('express');
const cors = require('cors');
const createAutobots = require('./services/createAutobots');
const { sequelize } = require('./models');

const app = express();
app.use(cors());
app.use(express.json());

require('dotenv').config();

const port = process.env.PORT || 3000;

// Import Routes
const routes = require('./routes');
app.use('/api', routes);

// Start Background Service
setInterval(createAutobots, 3600000); // 1 hour in milliseconds

// Start Server
sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
