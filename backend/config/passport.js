"use strict";
var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");

var { secret } = require("../config/configValues");
const Users = require('../Models/UserModel');
const jwt = require('jsonwebtoken');


// Setup work and export for the JWT passport strategy
function auth() {
    var opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
        secretOrKey: secret
    };
    passport.use(
        new JwtStrategy(opts, (jwt_payload, callback) => {
            //console.log('jwtId',jwt_payload);
            //console.log('jwtId',jwt_payload._id);
            //const user_id = jwt_payload._id;
            console.log('jwt_payload',jwt_payload._id);
            const user_id = jwt_payload._id
            Users.findById(user_id, (err, results) => {
                if (err) {
                    //console.log('err jwt',err);
                    return callback(err, false);
                }
                if (results) {
                    //console.log('results jwt',results);
                    callback(null, results);
                }
                else {
                    callback(null, false);
                }
            });
        })
    )
}

exports.auth = auth;
exports.checkAuth = passport.authenticate("jwt", { session: false });


