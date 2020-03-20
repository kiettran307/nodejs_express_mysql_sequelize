const Model = require('../config/mysql').User;
const bcrypt = require('bcrypt');
const Boom = require('boom');

const {createToken, hashPassword} = require('../utils/token.js');
const User = {
  async insertUser(req, res) {
    try {
        req.body.admin = false;
        const hash = await hashPassword(req.body.password);
        const user = {username: req.body.username, password: hash, email: req.body.email, admin: false};
        // const model = new Model(user);        
        const data = await Model.create(user);
        res.status(200).send({
            user: data,
            statusCode: 200,
          });
    } catch (error) {
      return res.status(400).send(Boom.badRequest(error.message).output.payload);
    }
  },
  async login(req, res) {
    try {
      const username = req.body.username;
      const user = await Model.findOne({where: {username}});
      if (!user){
          return res.status(400).send(Boom.badRequest('User not found').output.payload);
      }
      const validatePass = await bcrypt.compare(req.body.password, user.password);
      console.log('validatePass ', validatePass);
      if (user && validatePass) {
          const token = createToken(user);
          return res.status(200).send({
            statusCode: 200,
            token,
              user
          });
      }else{
          return res.status(400).send(Boom.badRequest('username or password is not valid').output.payload);
      }
    } catch (error) {
      return res.status(400).send(Boom.badRequest(error.message).output.payload);
    }
  },
  async getUsers(req, res) {
    try {
        const users = await Model.findAll();
        res.status(200).send({
        statusCode: 200,
        users
      });
    } catch (error) {
      return res.status(400).send(Boom.badRequest(error.message).output.payload);
    }
  },
  async getUser(req, res) {
    try {
        const user = await Model.findOne({where: {username: req.params.username}});
      res.status(200).send({
        statusCode: 200,
        user
      });
    } catch (error) {
      return res.status(400).send(Boom.badRequest(error.message).output.payload);
    }
  },
};
module.exports = User;
