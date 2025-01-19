const express = require('express');
const router = express.Router();

// Middleware to check if user is authenticated
function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/');
}

// Dashboard
router.get('/dashboard', isAuthenticated, (req, res) => {
    res.render('dashboard', { user: req.user });
});

// Logout
router.get('/logout', (req, res) => {
    req.logout(() => {
        res.redirect('/');
    });
});

module.exports = router;
