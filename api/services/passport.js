const password = require("passport");
const ExtractJwt = require("passport-jwt").ExtractJwt;
const JwtStrategy = require("passport-jwt").Strategy;

const User = require("../models/user");
const config = require("../config");
const passport = require("passport");

const jwtOptions = {
    secretOrKey:config.secret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}
const jwt = new JwtStrategy(jwtOptions, async (payload, done) => {
    try {
        // Use await to fetch the user by ID
        const user = await User.findById(payload.sub);
        if (user) {
            return done(null, user); // User found
        } else {
            return done(null, false); // No user found
        }
    } catch (error) {
        return done(error, false); // Error in database query
    }
});

passport.use(jwt)

