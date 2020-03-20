const jwt = require('jsonwebtoken');
const path = require('path');
const Boom = require("boom");
const { validationResult } = require('express-validator');

require('dotenv').config({path: path.join(__dirname, '..', '.env')});
function decodeTokenFromAuth(auth) {
    console.log(auth, process.env.SECRET);
  return jwt.verify(auth, process.env.SECRET);
}
function checkValidField(req, res, next){
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).send({ errors: errors.array() });
    }
    return next();
}
function checkTokenValidate(req, res, next) {
  let auth = req.headers.authorization;
  let result = true;
  try {
    result = decodeTokenFromAuth(auth);
    if (result) {
        return next();
    }
  } catch (error) {
    res.send(Boom.unauthorized('token invalid').output.payload);
  }
  
}
function checkTokenAdminValidate(req, res, next) {
    let auth = req.headers.authentication;
    let result = true;
  try {
     decodeTokenFromAuth(auth);
  } catch (error) {
     res.send(Boom.unauthorized('token invalid').output.payload);
  }
  if (auth === process.env.ADMIN_TOKEN) {
    if (result) {
        return next();
      }
  }else{
    res.send(Boom.unauthorized('token invalid').output.payload);
  }
}
module.exports = {checkValidField, checkTokenValidate, checkTokenAdminValidate};
