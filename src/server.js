const express = require('express');
const session = require('express-session');
const passport = require('passport');
const { Strategy } = require('passport-auth0');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

passport.use(
    new Strategy(
        {
            domain: process.env.AUTH_DOMAIN,
            clientID: process.env.AUTH_CLIENT_ID,
            clientSecret: process.env.AUTH_CLIENT_SECRET,
            callbackURL: process.env.AUTH_CALLBACK_URL
        },
        (accessToken, refreshToken, extraParams, profile, done) => {
            return done(null, profile);
        }
    )
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
    })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/downloads', express.static(path.join(__dirname, 'downloads')))
app.use('/api', require('./routes/api'));
app.use('/', require('./routes/auth'));

app.set('view engine', 'ejs');
app.set('views', './public');

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
