const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  price: {
    type: Number,
    required: true
  },
  fasting: {
    type: String,
    required: true
  },
  normalRange: {
    type: String,
    required: false
  },
  abnormalRange: {
    type: String,
    required: false
  },
  testType: {
    type: String,
    required: true,
  },
  result: {
    type: String,
    required: false,
  },
  value: {
    type: String,
    required: false,
  },
  enumerableValues: {
    type: String,
    required: false, 
  }
}, { 
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Test = mongoose.model('Test', testSchema);

module.exports = Test;
