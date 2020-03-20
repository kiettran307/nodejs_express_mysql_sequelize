module.exports = function (sequelize, Sequelize) {
    var User = sequelize.define('user', {
        username: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        password: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            validate: {
              isEmail: {
                msg: "Must be a valid email address",
              }
            }
        },
        admin: {
            type: Sequelize.STRING
        },
    });
    return User;
};