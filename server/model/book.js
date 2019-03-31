const mongoose = require('mongoose');
const stack = require('./stack')
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  name: String,
  genre: String,
  authorId: String
})

bookSchema.pre('find', function(){this._startTime = Date.now()})
bookSchema.post('find', function(){
  if (this._startTime) stack.push('book runtime: ' + (Date.now() - this._startTime));
})

module.exports = mongoose.model('Book', bookSchema)