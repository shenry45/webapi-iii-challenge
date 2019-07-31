const express = require('express');

const userDB = require('./userDb.js');

const router = express.Router();

router.post('/', validateUser, async (req, res) => {
  const user = req.body;

  const userInfo = await userDB.insert(user);

  res.status(200).json({
    success: true,
    message: userInfo
  });
});


router.post('/:id/posts', validateUserId, validatePost, async (req, res) => {
  const {id} = req.params;
  
  const userInfo = await userDB.getUserPosts(id);

  res.status(201).json({
    message: "User added",
    user: userInfo
  });
});

router.get('/', async (req, res) => {
  const users = await userDB.get();

  res.status(200).json({
    success: true,
    users: users
  });
});

router.get('/:id', validateUserId, (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user
  });
});

router.get('/:id/posts', validateUserId, async (req, res) => {
  const {id} = req.params;

  const postInfo = await userDB.getUserPosts(id);

  res.status(200).json({
    success: true,
    message: postInfo
  })
});

router.delete('/:id', validateUserId, async (req, res) => {
  const {id} = req.params;

  const postInfo = await userDB.remove(id);

  res.status(200).json({
    success: true,
    message: postInfo
  })
});

router.put('/:id', validateUserId, (req, res) => {

});

//custom middleware

async function validateUserId(req, res, next) {
  const {id} = req.params;
  const userCheck = await userDB.getById(id);
  
  if (userCheck) {
    console.log('passed validateUserId');
    req.user = userCheck;
    next();
  } else {
    res.status(400).json({
      message: "invalid user id"
    });
  }
  
};

function validateUser(req, res, next) {
  if (req.body) {
    if (req.body.name) {
      console.log('passed validateUser');
      next();
    } else {
      res.status(400).json({
        message: "missing require name field"
      })
    }
  } else {
    res.status(400).json({
      message: "missing user data"
    });
  }
};

function validatePost(req, res, next) {
  if (req.body) {
    if (req.body.text)  {
      next();
    } else {
      res.status(400).json({
        message: "missing required text field"
      })
    }
  } else {
    res.status(400).json({
      message: "missing post data"
    });
  }
};

module.exports = router;
