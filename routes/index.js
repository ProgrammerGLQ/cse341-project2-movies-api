const router = require('express').Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => { 
 //#swagger.tags=['Hello World'] 
     res.send('Hello World');
});

// Rutas para la colección de Películas
router.use('/movies', require('./movies'));

// 🟢 NUEVA LÍNEA: Conecta todas las rutas de la colección de Directores
router.use('/directors', require('./directors'));

module.exports = router;