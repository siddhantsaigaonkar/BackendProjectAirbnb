require('dotenv').config();  // Instead of import dotenv from 'dotenv';
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const ExpressError = require('../../utils/ExpressErr');  // Adjusted path with require
const listings = require('../../routes/listing');  // Adjusted path with require
const reviews = require('../../routes/review');  // Adjusted path with require
const Serverless = require('serverless-http');  // Instead of import Serverless from 'serverless-http';

// Create express app
const app = express();
const port = 8000;

// ejs configuration
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, '../../views')); // Adjust path as needed
app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.engine('ejs', ejsMate);

const MONGO_URL =  process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/wanderlust';

main()
  .then(() => {
    console.log('connected to DB');
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(MONGO_URL);
}

// listings route
app.use('/listings', listings);

// reviews route
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

app.listen(port, () => {
  console.log(`app is running on port no ${port}`);
});

// Serverless handler export
module.exports.handler = Serverless(app);  // Changed export to module.exports
