const express = require('express');
const app = express();
const router = require('express').Router();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

app.use(cookieParser())
const User = require('../models/user')

const {VERIFY_USER, FIND_MONGO_USER_BY_UID} =require('../firebase/tokenAuth')

//userID 이용해서 읽어오기
router.get('/:firebaseUid', async (req, res) => {
  try{
    user = await User.findOne({ firebaseUid: req.params.firebaseUid })
    .populate('treeData')
    .populate('posts.question')
    .populate('posts.answer')
    .populate('posts.questionComment')
    .populate('posts.answerComment')
    .exec()
    res.json(user)
  } catch(err) {
    res.json(err)
  }
})


router.put('/update', async (req, res) => {
  FIREBASE_USER= await VERIFY_USER(req,res)
  MONGO_USER = await FIND_MONGO_USER_BY_UID(FIREBASE_USER.uid)
  MONGO_UID = MONGO_USER[0]._id

  var objForUpdate={}
  if (req.body.displayName) objForUpdate.displayName = req.body.displayName
  if (req.body.point) objForUpdate.point = req.body.point
  if (req.body.introduce) objForUpdate.introduce = req.body.introduce
  objForUpdate={$set:objForUpdate}

  try{
    result=await User.updateOne(
      {_id:MONGO_UID},
      objForUpdate
    ).exec()
    res.json(result.ok)

  } catch(err) {
    res.json(err)
  }

})

// router.delete('/:userID', async (req, res) => {
// })

module.exports = router;
