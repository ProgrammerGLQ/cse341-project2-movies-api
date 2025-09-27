// routes/directors.js

const express = require('express');
const router = express.Router();

// Importa el controller de directores
const directorController = require('../controllers/directors'); 

// Importa el middleware de validación (que ahora tiene savemovie y savedirector)
const validation = require('../middleware/validate'); 


// 1. GET All
router.get('/', directorController.getAll);

// 2. GET Single
router.get('/:id', directorController.getSingle);

// 3. POST (APLICANDO VALIDACIÓN)
// Llama al middleware validation.savedirector ANTES de crear el director
router.post('/', validation.savedirector, directorController.createdirector); 

// 4. PUT (APLICANDO VALIDACIÓN)
// Llama al middleware validation.savedirector ANTES de actualizar el director
router.put('/:id', validation.savedirector, directorController.updatedirector);

// 5. DELETE
router.delete('/:id', directorController.deletedirector);


module.exports = router;