const mongoose = require('mongoose');
const stack = require('./stack')
const Schema = mongoose.Schema;

const authorSchema = new Schema({
  name: String,
  age: Number,
});

authorSchema.pre('findOne', function(){this._startTime = Date.now()})
authorSchema.post('findOne', function(){
  if (this._startTime) stack.push('author runtime: ' + (Date.now() - this._startTime));
});

module.exports = mongoose.model('Author', authorSchema)