var express = require('express');
const router = require('express').Router();
const mongoose = require('mongoose');
const async = require( "async" );

const Question = require('../models/question');
const Answer = require('../models/answer');
const QuestionComment = require('../models/questionComment');
const AnswerComment = require('../models/answerComment');
const TechTree = require('../models/techTree');
const { json } = require('body-parser');

const User = require('../models/user')
const {VERIFY_USER, FIND_MONGO_USER_BY_UID} =require('../firebase/tokenAuth');


router.put('/question/:id',async(req,res)=>{
    const id=req.params.id;
    FIREBASE_USER= await VERIFY_USER(req,res);
    MONGO_USER = await FIND_MONGO_USER_BY_UID(FIREBASE_USER.uid)
    MONGO_UID =MONGO_USER[0].firebaseUid;
    const question=await Question.findOne({_id:id}).exec();
    async.waterfall([
        function(callback){
            if(question.like_user.includes(MONGO_UID)==false){
                console.log("qwe")
                Question.findOneAndUpdate({_id:id},{$inc:{like:1}}).exec();
                Question.findOneAndUpdate({_id:id},{$push:{like_user:MONGO_UID}}).exec();
                // User.findOneAndUpdate({_id:MONGO_UID},{like:id}).exec();
            }
            else{
                Question.findOneAndUpdate({_id:id},{$inc:{like:-1}}).exec();
                Question.findOneAndUpdate({_id:id},{$pull:{like_user:MONGO_UID}}).exec();
            }
            callback(null);
        }],
        function(){
          res.send("done");
        }
      )
})

router.put('/answer/:id',async(req,res)=>{
    const id=req.params.id;
    FIREBASE_USER= await VERIFY_USER(req,res)
    MONGO_USER = await FIND_MONGO_USER_BY_UID(FIREBASE_USER.uid)
    MONGO_UID = MONGO_USER[0].firebaseUid
    const answer=await Answer.findOne({_id:id}).exec();
    async.waterfall([
        function(callback){
            if(answer.like_user.includes(MONGO_UID)==false){
                console.log("qwe")
                Answer.findOneAndUpdate({_id:id},{$inc:{like:1}}).exec();
                Answer.findOneAndUpdate({_id:id},{$push:{like_user:MONGO_UID}}).exec();
            }
            else{
                Answer.findOneAndUpdate({_id:id},{$inc:{like:-1}}).exec();
                Answer.findOneAndUpdate({_id:id},{$pull:{like_user:MONGO_UID}}).exec();
            }
            callback(null);
        }],
        function(){
          res.send("done");
        }
      )
})

router.put('/questioncomments/:id',async(req,res)=>{
    const id=req.params.id;
    FIREBASE_USER= await VERIFY_USER(req,res)
    MONGO_USER = await FIND_MONGO_USER_BY_UID(FIREBASE_USER.uid)
    MONGO_UID = MONGO_USER[0].firebaseUid
    const questioncomments=await QuestionComment.findOne({_id:id}).exec();
    async.waterfall([
        function(callback){
            if(questioncomments.like_user.includes(MONGO_UID)==false){
                console.log("qwe")
                QuestionComment.findOneAndUpdate({_id:id},{$inc:{like:1}}).exec();
                QuestionComment.findOneAndUpdate({_id:id},{$push:{like_user:MONGO_UID}}).exec();
                // User.findOneAndUpdate({_id:MONGO_UID},{like:id}).exec();
            }
            else{
                QuestionComment.findOneAndUpdate({_id:id},{$inc:{like:-1}}).exec();
                QuestionComment.findOneAndUpdate({_id:id},{$pull:{like_user:MONGO_UID}}).exec();
            }
            callback(null);
        }],
        function(){
          res.send("done");
        }
      )
})

router.put('/answercomments/:id',async(req,res)=>{
    const id=req.params.id;
    FIREBASE_USER= await VERIFY_USER(req,res)
    MONGO_USER = await FIND_MONGO_USER_BY_UID(FIREBASE_USER.uid)
    MONGO_UID = MONGO_USER[0].firebaseUid
    const answercomments=await AnswerComment.findOne({_id:id}).exec();
    async.waterfall([
        function(callback){
            if(answercomments.like_user.includes(MONGO_UID)==false){
                console.log("qwe")
                AnswerComment.findOneAndUpdate({_id:id},{$inc:{like:1}}).exec();
                AnswerComment.findOneAndUpdate({_id:id},{$push:{like_user:MONGO_UID}}).exec();
            }
            else{
                AnswerComment.findOneAndUpdate({_id:id},{$inc:{like:-1}}).exec();
                AnswerComment.findOneAndUpdate({_id:id},{$pull:{like_user:MONGO_UID}}).exec();
            }
            callback(null);
        }],
        function(){
          res.send("done");
        }
      )
})

router.put('/techtree/:id',async(req,res)=>{
    const id=req.params.id;
    FIREBASE_USER= await VERIFY_USER(req,res)
    MONGO_USER = await FIND_MONGO_USER_BY_UID(FIREBASE_USER.uid)
    MONGO_UID = MONGO_USER[0].firebaseUid
    const techtree=await TechTree.findOne({_id:id}).exec();
    async.waterfall([
        function(callback){
            if(techtree.like_user.includes(MONGO_UID)==false){
                console.log("qwe")
                TechTree.findOneAndUpdate({_id:id},{$inc:{like:1}}).exec();
                TechTree.findOneAndUpdate({_id:id},{$push:{like_user:MONGO_UID}}).exec();
            }
            else{
                TechTree.findOneAndUpdate({_id:id},{$inc:{like:-1}}).exec();
                TechTree.findOneAndUpdate({_id:id},{$pull:{like_user:MONGO_UID}}).exec();
            }
            callback(null);
        }],
        function(){
          res.send("done");
        }
      )
})
module.exports = router;