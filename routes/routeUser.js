const express = require('express');
const router= express.Router();

const {
    loginUser,
    signupUser
} =  require('../controllers/controllerUser')

router.post('/login',loginUser);

router.post('/signup',signupUser);

module.exports= router;