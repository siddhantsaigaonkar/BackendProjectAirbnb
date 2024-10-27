const mongoose = require("mongoose");
const Listingdata = require("./initData");
const Listing = require("../models/listing")

let MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
main()
  .then(() => {
    console.log(`connected to DB`);
  })
  .catch((err) => console.log(err));
async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async() => {
  await Listing.deleteMany({});
  await Listing.insertMany(Listingdata.data)
  console.log(`data is initialized`);
  
}

initDB()