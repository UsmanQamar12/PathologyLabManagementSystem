const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ['Male', 'Female'], // Enum for gender to ensure valid values
  },
  date: {
    type: Date,
    required: true,
  },
  tests: [{ type: Schema.Types.ObjectId, ref: 'Test' }],
}, {
  timestamps: {
    createdAt: true,
    updatedAt: true
  }}); // Adds createdAt and updatedAt timestamps

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
