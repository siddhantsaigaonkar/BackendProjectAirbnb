const Joi = require("joi");

const listingSchema = Joi.object({
    
          title: Joi.string().required(),
          description: Joi.string().required(),
          location : Joi.string().required(),
          country: Joi.string().required(),
          price: Joi.number().required().min(0),
          image:Joi.string().allow("",null)

})

module.exports =  listingSchema 


// const reviewSchema = Joi.object({
//   Comment: Joi.string().required(),
//   rating: Joi.number().required().min(1).max(5)

// })
// module.exports =  reviewSchema

const reviewSchema = Joi.object({
  comment: Joi.string().required(),   
  rating: Joi.number().required().min(1).max(5)   
});

module.exports = reviewSchema;