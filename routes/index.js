const router = require('express').Router();
const passport = require('passport'); 

router.use('/', require('./swagger'));

router.get('/login', passport.authenticate('github', { scope: 'user:email' }));
router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});


// movies
router.use('/movies', require('./movies'));

// directors
router.use('/directors', require('./directors'));

module.exports = router;