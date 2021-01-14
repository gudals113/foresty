const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 수정시작하기전임 
// Define Schemes
const questionSchema = new Schema({
    questionBody: {
        postID: {type:String},
        title : {type: String, required:true},
        content: {type: String, required:true},
        createdAt: {type : Date, default:Date.now},
        lastUpdate: {type: Date, default:Date.now},
        authorNickname: {type: String, required:true},
        authorID: {type: String, required:true},
        hashtags:[String]
    }
});


// Create Model & Export
module.exports = mongoose.model('Question', questionSchema);