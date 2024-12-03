const Joi = require('joi');

//Joi is a powerful schema description and data validation library 
module.exports.listingSchema = Joi.object({
    listing : Joi.object({
        title : Joi.string().required(),
        description : Joi.string().required().min(20),
        price : Joi.number().required().min(100),
        country : Joi.string().required().min(2),
        location : Joi.string().required().min(10)
    }).required()
})