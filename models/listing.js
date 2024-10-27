const mongoose = require("mongoose");

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
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
