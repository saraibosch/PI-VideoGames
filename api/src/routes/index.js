const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const Videogames = require('./Videogames');
const Genre = require('./Genre');
const Videogame = require('./Videogame');
const Platforms = require('./platforms')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/videogames', Videogames);
router.use('/videogame', Videogame);
router.use('/genre', Genre);
router.use('/platforms', Platforms);


module.exports = router;
