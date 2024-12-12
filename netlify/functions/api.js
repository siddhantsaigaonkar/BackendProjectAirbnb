require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const ExpressError = require('../../utils/ExpressErr');
const listings = require('../../routes/listing');
const reviews = require('../../routes/review');
const Serverless = require('serverless-http');

// Create express app
const app = express();
const port = 8000;

// ejs configuration
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, '../../views')); // Make sure this path is correct
app.use(express.static(path.join(__dirname, '../../public'))); // Ensure public folder exists
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.engine('ejs', ejsMate);

// MongoDB connection
const MONGO_URL = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/wanderlust';

main()
  .then(() => {
    console.log('connected to DB');
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(MONGO_URL);
}

// listings and reviews routes
app.use('/listings', listings);
app.use('/listings/:id/reviews', reviews);

// Error handling
app.all('*', (req, res, next) => {
  next(new ExpressError(404, 'Page not found'));
});

app.use((err, req, res, next) => {
  let { statusCode, message } = err;
  if (!statusCode) statusCode = 500;
  console.log(err);
  res.status(statusCode).render('listings/errors', { err });
});

// Start the server for local development
app.listen(port, () => {
  console.log(`app is running on port no ${port}`);
});

// Serverless handler export
module.exports.handler = Serverless(app);
