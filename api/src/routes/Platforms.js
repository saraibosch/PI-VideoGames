require('dotenv').config();
const { Router } = require('express');
const axios = require('axios');
const { API_KEY } = process.env;
const { Videogame} = require('../db');
const { mapeoPlatforms } = require('./Controllers');
const router = Router();

router.get('/', async (req, res) => {

    const searchApi = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`);
    let platFilter = mapeoPlatforms(searchApi.data.results);

    
    //entro al bendito next para traer los 100
    var nextApi = searchApi.data.next;

    while (platFilter.length < 100) {
        const actualNext = await axios.get(nextApi); 
        const newPedido = await mapeoPlatforms(actualNext.data.results)
        platFilter = [...platFilter, ...newPedido];

        nextApi = actualNext.data.next

    }
    //console.log(platFilter);
    

    let platforms = []
    let platf = platFilter;
    platf.forEach(g => g.platforms.forEach(p => {
        if(!platforms.includes(p)) {platforms.push(p)}
    }))
    

    //res.json(platf);
    res.send(platforms);
    
    

})



module.exports = router;