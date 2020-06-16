const router = require('express').Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');


router.get('/test', (req, res)=>{
    console.log(req.user);
    res.send(req.user);
})

// auth with google
router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}))

// callback route for google to redirect to, to get user information
router.get('/google/redirect', passport.authenticate('google'), (req, res) => { 
    res.send(req.user);
})


// handle logout for google user
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
})


module.exports = router;