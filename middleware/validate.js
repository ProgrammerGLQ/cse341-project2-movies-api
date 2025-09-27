const validator = require('../helpers/validate'); 


// =================================================================
// 1. MOVIES 
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
            // Error 412: 
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
// 2.  DIRECTORS
// =================================================================
const savedirector = (req, res, next) => {
    

    const validationRule = {
        firstName: 'required|string',
        lastName: 'required|string',
        birthYear: 'required|integer',
        nationality: 'required|string'
    };

    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            // Error 412: 
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
//  Export Functions
// =================================================================
module.exports = {
    savemovie,
    savedirector 
};