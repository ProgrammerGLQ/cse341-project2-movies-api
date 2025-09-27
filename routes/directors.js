const express = require('express');
const router = express.Router();

const directorController = require('../controllers/directors'); 
const validation = require('../middleware/validate'); 


// 1. GET All
router.get('/', directorController.getAll);

// 2. GET Single
router.get('/:id', directorController.getSingle);

// 3. POST ( VALIDATION)
router.post('/', validation.savedirector, directorController.createdirector); 

// 4. PUT ( VALIDATION)
router.put('/:id', validation.savedirector, directorController.updatedirector);

// 5. DELETE
router.delete('/:id', directorController.deletedirector);


module.exports = router;