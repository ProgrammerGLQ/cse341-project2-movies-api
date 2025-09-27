const express = require('express');
const router = express.Router();

const moviesController = require('../controllers/movies');
const validation = require('../middleware/validate');

router.get('/', moviesController.getAll);
router.get('/:id', moviesController.getSingle);

router.post('/', validation.savemovie, moviesController.createmovie);
router.put('/:id', validation.savemovie, moviesController.updatemovie);

router.delete('/:id', moviesController.deletemovie);

module.exports = router;