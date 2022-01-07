require("dotenv").config();
const { Router } = require('express');
const router = Router();
const { Genre } = require('../db.js');


router.get('/', async (req, res) => {
    const pedidoGenres = await Genre.findAll();
    res.status(200).json(pedidoGenres)
})



module.exports = router;