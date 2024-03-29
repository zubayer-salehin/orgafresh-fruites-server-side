const mongoose = require('mongoose');

const myItemSchema = new mongoose.Schema({
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
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
})

const myItemModel = mongoose.model("MyItem", myItemSchema);

module.exports = myItemModel;