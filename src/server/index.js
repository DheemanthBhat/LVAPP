const express = require('express');
const cors = require('cors');

const connectDB = require('../config/db');
const apiRouter = require('./routes/api_router');

// Connect Database
connectDB();

const app = express();

app.use(express.static('dist'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/api', apiRouter);

app.listen(process.env.PORT || 8000, () => {
  console.log(`Listening on port ${process.env.PORT || 8000}!`);
});
