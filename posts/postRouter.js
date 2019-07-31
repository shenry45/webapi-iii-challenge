const express = require('express');

const db = require('..//posts/postDb.js');

const router = express.Router();

// Custom Middleware
function getReqBody(req, res, next) {
  if (req.body) {
    next();
  } else {
    res.status(500).json({
      message: "Please submit a post ID along with this request."
    })
  }
}

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

router.get('/:id', getReqBody, async (req, res) => {
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

router.delete('/:id', async (req, res) => {
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

router.put('/:id', (req, res) => {

});

// custom middleware

function validatePostId(req, res, next) {

};

module.exports = router;