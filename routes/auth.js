const express = require('express');
const passport = require('passport');
const router = express.Router();

// Google Authentication Route
router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email'],
}));

// Google Callback Route
router.get('/google/callback', passport.authenticate('google', {
    failureRedirect: '/',
}), (req, res) => {
    // Redirect to dashboard after successful login
    res.redirect('/dashboard');
});

// Microsoft Login
router.get('/microsoft', passport.authenticate('oidc'));

// Microsoft Callback
router.get('/microsoft/callback', passport.authenticate('oidc', {
    failureRedirect: '/',
}), (req, res) => {
    res.redirect('/dashboard');
});

module.exports = router;
