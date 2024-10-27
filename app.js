const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 8000;
const Listing = require("./models/listing")
const path = require("path")
const methodOverride = require("method-override")
const ejsMate = require("ejs-mate");


// ejs 
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))
app.use(express.urlencoded({extended:true}))
app.use(methodOverride("_method"))
app.engine("ejs", ejsMate)
app.use(express.static(path.join(__dirname,"/public")))

let MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
main()
  .then(() => {
    console.log(`connected to DB`);
    
  })
  .catch((err) => console.log(err));
async function main() {
  await mongoose.connect(MONGO_URL);
}

// Index route
app.get("/listings", async (req, res) => {
  try {
    let allListing = await Listing.find({});    
    res.render("listings/index", { allListing });
  } catch (err) {
    console.error("Error fetching listings:", err);
    res.status(500).send("Error fetching listings");
  }
});


// create New

app.get("/newlistings", (req, res) => {
  res.render("listings/new")
})


// create route
app.post("/listings", async (req, res) => {
  try {
    let newlisting = new Listing(req.body.listing);
    await newlisting.save();
     console.log(newlisting);
     
    res.redirect("/listings");
  } catch (error) {
    console.error("Error creating listing:", error);
    res.status(500).send("Error creating listing");
  }
});

// show Route
app.get("/listings/:id", async (req, res) => {

  try {
  let { id } = req.params;
    let listing = await Listing.findById(id);
    res.render("listings/show",{listing})
  } catch (err) {
    console.error("Error fetching listings:", err);
    res.status(500).send("Error fetching listings");
  }
})


// edit route

app.get("/listings/:id/edit", async(req, res) => {
  let { id } = req.params
   const listing = await Listing.findById(id); // Fetch the listing by ID
  res.render("listings/edit",{listing})
})

// update route

app.put("/listings/:id", async (req, res) => {
  let { id } = req.params;
  try {
    await Listing.findByIdAndUpdate(id, {...req.body.listing });
    res.redirect(`/listings/${id}`);
  } catch (err) {
    console.error("Error updating listing:", err);
    res.status(500).send("Error updating listing");
  }
});

app.delete("/listings/:id", async(req, res) => {
  let { id } = req.params;
  try {
    await Listing.findByIdAndDelete(id)
    res.redirect("/listings")
  } catch (error) {
    console.error("Error updating listing:", err);
    res.status(500).send("Error deleting listing");
  }
})




// app.get("/testListing", async (req,res) => {
//   let sampelTesting = new Listing({
//     title: "My new Villa",
//     price: 3000,
//     location: "Shrivardhan",
//     country: "INDIA"
//   });
//   await sampelTesting.save();
//   console.log(`sample is saved`);
//   res.send(`testing sucessful`)
  
// })





app.listen(port, () => {
  console.log(`app is running on port no ${port}`);
  
})