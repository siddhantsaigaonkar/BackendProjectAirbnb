require('dotenv').config();

import { Router } from 'express';
const router = Router();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 8000;
const path = require("path")
const methodOverride = require("method-override")
const ejsMate = require("ejs-mate");
const ExpressError = require("../../utils/ExpressErr");
const listings = require("../../routes/listing")
const reviews = require("../../routes/review")
import Serverless from 'serverless-http';


// ejs
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))
app.use(express.static(path.join(__dirname, "public")))
app.use(express.urlencoded({extended:true}))
app.use(methodOverride("_method"))
app.engine("ejs", ejsMate)
 
const MONGO_URL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/wanderlust";
main()
  .then(() => {
    console.log(`connected to DB`);
    
  })
  .catch((err) => console.log(err));
async function main() {
  await mongoose.connect(MONGO_URL);
}


// listings

router.use("/listings", listings)

// reviews
router.use("/listings/:id/reviews", reviews)


app.all("*", (req,res,next) => {
  next((new ExpressError(404,"Page not found")))
})

app.use((err, req, res, next) => {
  let { statusCode, message } = err;
  if (!statusCode) statusCode = 500;
  console.log(err);
  
  res.status(statusCode).render("listings/errors", { err });
})

// app.listen(port, () => {
//   console.log(`app is running on port no ${port}`);
  
// })

export const handler = Serverless(app);