const router = require('express').Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => { 
    //#swagger.tags=['Hello World'] 
    res.send('Hello World');
});

//  movies
router.use('/movies', require('./movies'));

// directors
router.use('/directors', require('./directors'));

module.exports = router;