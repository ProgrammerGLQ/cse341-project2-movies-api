// middleware/validate.js


const validator = require('../helpers/validate');

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
  
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err 
            });
        } else {
       
            next();
        }
    });
};

module.exports = {
    savemovie
};