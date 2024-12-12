const mongoose = require("mongoose"); 
const Listing = require("./listing");
const reviewSchema = new mongoose.Schema({
  comment: String,
  rating: {
    type: Number,
    min: 1,
    max: 5
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  listing: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Listing"
  }
});
const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;

