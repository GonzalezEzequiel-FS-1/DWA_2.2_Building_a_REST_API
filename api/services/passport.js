const password = require("passport");
const ExtractJwt = require("passport-jwt").ExtractJwt;
const JwtStrategy = require("passport-jwt").Strategy;

const User = require("../models/user");
const config = require("../config");
const passport = require("passport");

const jwtOptions = {
    secretOrKey:config.secret,
    jwtFromRequest: ExtractJwt.fromHeader("Authorization")
}
Jwtstrategy = new JwtStrategy(jwtOptions, function(payload, done){
    User.findById(payload.sub, function(error, user){
        if(error){
            return done(error, false)
        }
        if(user){
            done(null, false)
        }
    })
})
passport.use(JwtStrategy)