const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');

const keys = require('./keys').google;
const GoogleUser = require('../models/user').GoogleUser;


passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser((id, done) => {
    GoogleUser.findById(id)
        .then(user => {
            done(null, user);
        })
})


// set up a strategy to use for google users
passport.use(
    new GoogleStrategy({
        // options for the strategy
        callbackURL: 'http://localhost:4200',
        clientID: keys.clientID,
        clientSecret: keys.clientSecret
    }, (accessToken, refreshToken, profile, done) => {
        // check if user already exists in DB
        GoogleUser.findOne({
                googleId: profile.id
            })
            .then(userExists => {
                if (userExists) {
                    done(null, userExists);                    
                } else {
                    new GoogleUser({
                            username: profile.displayName,
                            firstName: profile.name.givenName,
                            lastName: profile.name.familyName,
                            googleId: profile.id,
                            profilePic: profile.photos[0].value
                        })
                        .save()
                        .then(newUser => {
                            done(null, newUser);
                        })
                }
            })
    })
)