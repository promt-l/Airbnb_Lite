const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type:String,
        required: true
    },
    description: {
        type:String
    },
    image: {
        type:String,
        default:"/images/default.jpg"
    },
    price: {
        type: Number
    },
    location: {
        type: String
    },
    country: {
        type: String
    },
    review: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review',
        }
    ]
});

const Listing = mongoose.model("Listing",listingSchema);
module.exports = Listing;
