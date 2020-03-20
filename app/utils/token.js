
/**
 * Created by A on 7/18/17.
 */
'use strict';
const path = require("path");
const bcrypt = require('bcrypt');

require('dotenv').config({
    path: path.join(__dirname, '../..', '.env')
});

const jwt       = require('jsonwebtoken');

function createToken(user) {
    let scopes;
    // Check if the user object passed in
    // has admin set to true, and if so, set
    // scopes to admin
    if (user.admin) {
        scopes = 'admin';
    }
    // Sign the JWT
    console.log('secret', process.env.SECRET);
    return jwt.sign({
            username: user.username,
            scope: scopes
        },
        process.env.SECRET,
        {
            algorithm: 'HS256',
            expiresIn: process.env.EXPIRED_IN
        }
    );
}
async function hashPassword(password) {
    console.log('asdadadsa asdsa dasd', password);
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    console.log('password, salt');
    console.log(password, salt);
    return hash;
}
module.exports = {createToken, hashPassword};