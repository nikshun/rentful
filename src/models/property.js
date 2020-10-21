const mongoose = require('mongoose')
// const validator = require('validator')

const propertySchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    owner: {
        type: String,
        required: true,
    },
    photoUrl: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
})

const Property = mongoose.model('Property', propertySchema)

module.exports = Property