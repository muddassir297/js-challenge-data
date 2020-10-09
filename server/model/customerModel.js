// contactModel.js
const mongoose = require('mongoose');

const beautifyUnique = require('mongoose-beautiful-unique-validation');

// Setup schema
var customerSchema = mongoose.Schema({
    name: {
        first:{
            type: String,
            required: true,
            description: "String value allowed"
        },
        last:{
            type: String,
            required: true,
            description: "String value allowed"
        }
    },
    birthday: {
        type: Date
    },    
    gender:{
        type: String,
        enum: ['m', 'w']
    },
    lastContact: {
        type: Date
    },
    customerLifetimeValue: {
        type: Number
    }
});
customerSchema.plugin(beautifyUnique);
// Export Contact model
var Customer = module.exports = mongoose.model('customer', customerSchema);
module.exports.get = function (callback, limit) {
    Customer.find(callback).limit(limit);
}