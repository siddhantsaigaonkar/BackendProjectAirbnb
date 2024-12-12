const express = require("express");
const router = express.Router({mergeParams: true}); 
const ExpressError = require("../utils/ExpressErr")
const reviewSchema = require("../schema")
const Review = require("../models/review");
const Listing = require("../models/listing");

const validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body.review);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, msg);
  } else {
    next();
  }
};


router.post("/",validateReview ,async (req, res) => {
  try {
    // Fetch the listing by ID
    const listing = await Listing.findById(req.params.id);
    // Create a new review from the form data
    const review = new Review(req.body.review);
    await review.save();

    // Push the review ID into the reviews array
    listing.reviews.push(review._id);

    // Log the reviews array after adding the review
    console.log("Listing reviews after adding review:", listing.reviews);

    // Save the updated listing document
    await listing.save();

    console.log("Review saved successfully");
    res.redirect(`/listings/${listing._id}`);
  } catch (err) {
    console.error("Error saving review:", err.message);
    res.status(500).send("Something went wrong");
  }
});

// review delete  

router.delete("/:reviewId", async (req, res) => {
  try {
    // Fetch the listing by ID
    let { id, reviewId } = req.params;  
    
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    console.log("Review deleted successfully");
    
    res.redirect(`/listings/${id}`);

  } catch (err) {
    console.error("Error deleting review:", err.message);
    res.status(500).send("Something went wrong");
  }
});



module.exports = router