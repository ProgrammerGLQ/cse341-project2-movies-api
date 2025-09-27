// middleware/validate.js

// Importar el helper que acabamos de crear (que usa validatorjs)
const validator = require('../helpers/validate');

const savemovie = (req, res, next) => {
    // Reglas de validación para las propiedades de la película
    const validationRule = {
        name: 'required|string',
        genre: 'required|string',
        subgenre: 'required|string',
        
        // El año debe ser un número entero (integer)
        releaseYear: 'required|integer', 
        
        // La calificación debe ser un número (numeric) o entero (integer)
        rating: 'required|numeric', 
        
        countryOfOrigin: 'required|string',
        language: 'required|string',
    };

    // Usar el helper 'validator' para procesar la solicitud
    validator(req.body, validationRule, {}, (err, status) => {
        // Si el estado es false (falló la validación)
        if (!status) {
            // Devolver un error 400 (Bad Request) o 412 (Precondition Failed) como tu profesor
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err // Contiene los errores detallados
            });
        } else {
            // Si es exitoso, pasa al controlador
            next();
        }
    });
};

module.exports = {
    savemovie
};