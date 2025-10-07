const router = require('express').Router();
const directorController = require('../controllers/directors'); 
const validation = require('../middleware/validate'); 
const isAuthenticated = require('../middleware/authenticate').isAuthenticated; 

router.get('/', directorController.getAll);
router.get('/:id', directorController.getSingle);

router.post('/', isAuthenticated, validation.savedirector, directorController.createdirector); 
router.put('/:id', isAuthenticated, validation.savedirector, directorController.updatedirector);
router.delete('/:id', isAuthenticated, directorController.deletedirector);

module.exports = router;
