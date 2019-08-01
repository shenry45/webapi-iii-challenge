const express = require('express');

const db = require('..//posts/postDb.js');

const router = express.Router();

// METHODS

router.get('/', async (req, res) => {
  try {
    const postsInfo = await db.get();

    res.status(200).json({
      success: true,
      data: postsInfo
    })
  }
  catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
});

router.get('/:id', validatePostId, async (req, res) => {
  try {
    const {id} = req.params;
    const postInfo = await db.getById(id);
    
    res.status(200).json({
      success: true,
      post: postInfo
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
});

router.delete('/:id', validatePostId, async (req, res) => {
  try {
    const {id} = req.params;
    const postInfo = await db.remove(id);
    
    res.status(200).json({
      success: true,
      post: postInfo
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
});

router.put('/:id', validatePostId, async (req, res) => {
  try {
    const post = req.body;
    const postInfo = await db.insert(post);
    
    res.status(200).json({
      success: true,
      post: postInfo
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
});

// CUSTOM MIDDLEWARE

async function validatePostId(req, res, next) {
  if (req.body) {
    const {id} = req.params;

    const checkID = await db.getById(id);

    if (checkID) {
      req.user = id;
      next();
    }
  } else {
    res.status(400).json({
      message: "invalid user id"
    })
  }
};

module.exports = router;