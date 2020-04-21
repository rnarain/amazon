"use strict";
var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");
var { secret } = require("./configValues");
//const Student = require('../Models/StudentModel');
const Company = require('../Models/CompanyModel');


module.exports = function (passport) {
    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("Bearer");
    opts.secretOrKey = secret;
    passport.use(
        new JwtStrategy(opts, (jwt_payload, callback) => {
            console.log(jwt_payload);
            const user_id = jwt_payload._id;
            if (jwt_payload.type == 0) {
                /*Student.findById(user_id, (err, results) => {
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
                });*/ //Commented for dev
            }
            else {
                Company.findById(user_id, (err, results) => {
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
            }

        })
    )
};

