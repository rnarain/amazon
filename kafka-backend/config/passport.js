"use strict";
var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");
var { secret } = require("./configValues");
const Students = require('../Models/StudentModel');

module.exports = function(passport) {
    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("Bearer");
    opts.secretOrKey = secret;
    passport.use(
        new JwtStrategy(opts, (jwt_payload, callback) => {
                        console.log(jwt_payload);
                        const user_id = jwt_payload._id;
                        Students.findById(user_id, (err, results) => {
                            console.log(user_id);
                            if (err) {
                                return callback(err, false);
                            }
                            if (results) {
                                callback(null, results);
                            }
                            else {
                                callback(null, false);
                            }
                        });
                    })
    )};

    