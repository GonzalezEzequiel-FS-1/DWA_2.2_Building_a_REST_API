const passport = require("passport");
const ExtractJwt = require("passport-jwt").ExtractJwt;
const JwtStrategy = require("passport-jwt").Strategy;
const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/user");
const config = require("../config");

// JWT Strategy options
const jwtOptions = {
    secretOrKey: config.secret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

// JWT Strategy implementation
const jwt = new JwtStrategy(jwtOptions, async (payload, done) => {
    try {
        // Fetch the user by ID from the payload
        const user = await User.findById(payload.sub);
        return user ? done(null, user) : done(null, false); // User found or not found
    } catch (error) {
        return done(error, false); // Handle error during database query
    }
});

// Options for Local Strategy
const localOptions = {
    usernameField: "newUser",
};

// Implementing Local Strategy
const localStrategy = new LocalStrategy(localOptions, async (newUser, password, done) => {
    try {
        const user = await User.findOne({ newUser });
        if (!user) return done(null, false); // User Not Found

        // Compare passwords
        user.comparePassword(password, (error, isMatch) => {
            if (error) return done(error);
            if (!isMatch) return done(null, false); // Password does not match
            return done(null, user); // Authentication successful
        });
    } catch (error) {
        return done(error);
    }
});

// Use the strategies in Passport
passport.use(localStrategy);
passport.use(jwt);
