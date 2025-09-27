// middleware/validate.js

// Asumiendo que este módulo está en un nivel superior, 
// o en un archivo diferente (helpers/validate.js, por ejemplo).
// Verifica la ruta de importación de tu función base 'validator'
const validator = require('../helpers/validate'); 


// =================================================================
// 1. VALIDACIÓN PARA MOVIES (TU CÓDIGO EXISTENTE)
// =================================================================
const savemovie = (req, res, next) => {
    
    const validationRule = {
        name: 'required|string',
        genre: 'required|string',
        subgenre: 'required|string',
        
        releaseYear: 'required|integer', 
        
        rating: 'required|numeric', 
        
        countryOfOrigin: 'required|string',
        language: 'required|string',
    };

    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            // Error 412: Precondition Failed (Tu código de error preferido)
            res.status(412).send({
                success: false,
                message: 'Movie Validation failed',
                data: err 
            });
        } else {
            next();
        }
    });
};


// =================================================================
// 2. VALIDACIÓN PARA DIRECTORS (CÓDIGO NUEVO)
// =================================================================
const savedirector = (req, res, next) => {
    
    // Reglas adaptadas a las propiedades del Director
    const validationRule = {
        firstName: 'required|string',
        lastName: 'required|string',
        birthYear: 'required|integer', // Asumimos que quieres un entero
        nationality: 'required|string'
    };

    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            // Error 412: Precondition Failed (Tu código de error preferido)
            res.status(412).send({
                success: false,
                message: 'Director Validation failed',
                data: err 
            });
        } else {
            next();
        }
    });
};


// =================================================================
// 3. EXPORTAR AMBAS FUNCIONES
// =================================================================
module.exports = {
    savemovie,
    savedirector // 🟢 ¡Asegúrate de exportar la nueva función!
};