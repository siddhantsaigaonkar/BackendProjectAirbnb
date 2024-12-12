const express = require("express");
const router = express.Router();
const ExpressError = require("../utils/ExpressErr")
const listingSchema = require("../schema")
const Listing = require("../models/listing")
const validateListing = (req, res, next) => {
  const { error } = listingSchema.validate(req.body.listing);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, msg);
  } else {
    next();
  }
}

// Index route
router.get("/",  async (req, res) => {
  try {
    let allListing = await Listing.find({});    
    res.render("listings/index", { allListing });
  } catch (err) {
    console.error("Error fetching listings:", err);
    res.status(500).send("Error fetching listings");
  }
});


// create New

router.get("/new", (req, res) => {
  res.render("listings/new")
})


router.post("/",validateListing ,async (req, res, next) => {
  try { 
    // Create and save the new listing to the database
    const newListing = new Listing(req.body.listing);
    
    await newListing.save();

    // Redirect to the listings page upon successful save
    res.redirect("/listings");
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
});

// show Route
router.get("/:id", async (req, res) => {
try {
  let { id } = req.params;
    let listing = await Listing.findById(id).populate("reviews");
    res.render("listings/show",{listing})
  } catch (err) {
    console.error("Error fetching listings:", err);
    res.status(500).send("Error fetching listings");
  }
})


// edit route

router.get("/:id/edit",async (req, res) => {
  let { id } = req.params
   const listing = await Listing.findById(id); // Fetch the listing by ID
  res.render("listings/edit",{listing})
})
// update route

router.put("/:id",validateListing,async (req, res,next) => {
  try {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing });
    res.redirect(`/listings/${id}`);
  } catch (error) {
    next(error)
  }

});

router.delete("/:id", async (req, res) => {
  let { id } = req.params;
  try {
    await Listing.findByIdAndDelete(id)
    res.redirect("/listings")
  } catch (error) {
    console.error("Error updating listing:", err);
    res.status(500).send("Error deleting listing");
  }
})


module.exports = router;