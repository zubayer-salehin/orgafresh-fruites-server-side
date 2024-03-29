const mongoose = require('mongoose');

const fruiteSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    supplierName: {
        type: String,
        required: true
    },
    sold: {
        type: Number,
        required: true
    },
    userName: {
        type: String
    },
    email: {
        type: String
    }
})

const fruiteModel = mongoose.model("fruite", fruiteSchema);

module.exports = fruiteModel;