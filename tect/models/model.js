const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Define Schemes
const bookSchema = Schema({
    author: {
        type:mongoose.SchemaTypes.ObjectId,
        ref: "Author"},
    title : {type:String}
});

const authorSchema = Schema({
    name:{type:String},
    age:{type:String}
  });

const Book = mongoose.model('Book', bookSchema);
const Author = mongoose.model('Author', authorSchema);
// Create Model & Export
module.exports = {Book, Author}