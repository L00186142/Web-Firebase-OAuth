const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// Configure Google OAuth strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL,
}, (accessToken, refreshToken, profile, done) => {
    // User information returned here
    return done(null, profile);
}));

// Serialize user to session
passport.serializeUser((user, done) => {
    done(null, user);
});

// Deserialize user from session
passport.deserializeUser((user, done) => {
    done(null, user);
});
