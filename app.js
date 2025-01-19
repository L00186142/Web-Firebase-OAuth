const express = require('express');
const session = require('express-session');
const passport = require('passport');
require('dotenv').config();

// Load Passport strategies
require('./config/passport-google');
require('./config/passport-microsoft');

const authRoutes = require('./routes/auth');

const app = express();

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

// Set view engine
app.set('view engine', 'ejs');

// Routes
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
    res.render('login');
});

app.get('/dashboard', (req, res) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/');
    }
    res.send(`Welcome, ${req.user.displayName || 'User'}!`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
