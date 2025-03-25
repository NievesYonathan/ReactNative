const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const key = require('./key');
const User = require('./models/user');

module.exports = (passport) => {
    