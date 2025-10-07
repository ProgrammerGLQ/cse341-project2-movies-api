const express = require('express');
const router = express.Router();

const moviesController = require('../controllers/movies');
const validation = require('../middleware/validate');

const isAuthenticated = require('../middleware/authenticate').isAuthenticated; 


router.get('/', moviesController.getAll);
router.get('/:id', moviesController.getSingle);


router.post('/', isAuthenticated, validation.savemovie, moviesController.createmovie);
router.put('/:id', isAuthenticated, validation.savemovie, moviesController.updatemovie);
router.delete('/:id', isAuthenticated, moviesController.deletemovie);

module.exports = router;