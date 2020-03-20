// const sequelize = new Sequelize('mysql://root:123456@localhost/mydb');
var Sequelize = require('sequelize')
const sequelize = new Sequelize('express_mysql', 'express', '123456', {
    host: 'localhost',
    dialect: 'mysql'
  });
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.User = require('../models/user')(sequelize, Sequelize);
db.initDatabase = function () {
    db.User.sync({ force: false }).then((err) => {
        console.log('view result:', err)
        if (!err) {
            console.log('An error occur while creating table');
        }
    })
}
//..init some table herer
module.exports = db;