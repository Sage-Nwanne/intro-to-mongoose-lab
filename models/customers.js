const mongoose = require('mongoose');


const customerSchema = new mongoose.Schema({
    name: String,
    age: Number,
});



const Customers = mongoose.model('Customer', customerSchema);

module.exports = Customers;

