// helpers/validate.js

const Validator = require('validatorjs');

// Exportamos la función 'validator' que envuelve la lógica de validación
const validator = (body, rules, customMessages, callback) => {
    // 1. Inicializar la clase Validator
    const validation = new Validator(body, rules, customMessages);

    // 2. Comprobar si la validación pasa
    validation.passes(() => callback(null, true));

    // 3. Comprobar si la validación falla
    validation.fails(() => callback(validation.errors, false));
};

module.exports = validator;