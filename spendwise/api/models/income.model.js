const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const incomeSchema = new Schema({
  title: {type: String, required: true},
  type: {type: String, required: true},
  month: {type: String, required: true},
  year: {type: Number, required: true},
}, {
  timestamps: true,
})

const Income = mongoose.model('Income', incomeSchema);

module.exports = Income;
