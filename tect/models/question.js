const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Define Schemes
const questionSchema = new Schema({
    questionBody: {
        title : {type: String, required:true},
        content: {type: String, required:true},
        createdAt: {type : Date, default:Date.now},
        lastUpdate: {type: Date, default:Date.now},
        authorNickname: {type: String, required:true},
        authorID: {type: String, required:true},
        hashtags:[String],
        // answers:[{
        //     type:mongoose.SchemaTypes.ObjectId,
        //     ref: "Answer"
        // }], 
        // comments:[{
        //     type:mongoose.SchemaTypes.ObjectId,
        //     ref: "Comment"
        // }],
       
    }
});


// Create Model & Export
module.exports = mongoose.model('Question', questionSchema);