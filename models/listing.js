const mongoose = require("mongoose");
const Review = require("./review");  // Import the Review model

const listingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    filename: {
      type: String,
      required: true,
      default: "default_image",
    },
    url: {
      type: String,
      required: true,
      default:
        "https://cdn.pixabay.com/photo/2023/02/02/10/02/sunset-7762468_640.jpg",
    },
  },
  price: Number,
  location: String,
  country: String,
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",  // This refers to the Review model
    },
  ],
});

listingSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await Review.deleteMany({
      _id: {
        $in: doc.reviews,
      },
    });
  }
})



const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;



