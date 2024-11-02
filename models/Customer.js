const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: String,
  age: Number,
});

const customerModel = mongoose.model('customer', customerSchema);

module.exports = customerModel;