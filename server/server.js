const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const cookieSession = require('cookie-session');
const passport = require('passport');

const api = require('./routes/api');
const auth = require('./routes/auth');
const passportSetup = require('./config/passport-setup');
const database = require('./database/db');
const sessionCookieKey = require('./config/keys').session.cookieKey;

const app = express();
const PORT = 3000;

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());

app.use(cookieSession({
    // 24hours (or how much we want) * 60min * 60sec * 1000milisec = maxAge in miliseconds
    maxAge: 24*60*60*1000,
    keys: [sessionCookieKey]
}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());


// handle basic api routes
app.use('/api', api);

// handle authentication routes
app.use('/auth', auth);


// handle errors
app.use((req, res, next) => {
    const error = new Error('Page not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});


// start listening
app.listen(PORT, () => {
    console.log(`Server running on port:${PORT}`);
})