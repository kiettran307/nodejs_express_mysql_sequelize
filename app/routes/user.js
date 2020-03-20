const express = require('express');
const router = new express.Router();
const userapi = require('../controllers/user');
const middleware = require('../utils/middleware');
const { check } = require('express-validator');

router.get('/users',  middleware.checkTokenValidate, userapi.getUsers);
router.get('/user/:username', userapi.getUser);
router.post('/user', [
    check('username').isLength({ min: 5 }),
    check('email').isEmail(),
    check('password').isLength({ min: 5 }),
  ], middleware.checkValidField, userapi.insertUser);
router.post('/login', userapi.login);
module.exports = router;
