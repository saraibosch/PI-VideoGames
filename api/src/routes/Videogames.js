require('dotenv').config();
const { Router } = require('express');
const axios = require('axios');
const { API_KEY } = process.env;
const { Videogame, Genre } = require('../db');

const router = Router();
const { mapeoGames, allGames} = require('./Controllers.js');
const { Op } = require('sequelize');


router.get('/', async (req, res) =>{

    const {name} = req.query;
    try {
        if(name){
            const searchApi = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`);
            var gamesDb = await Videogame.findAll({
                where: {
                    name: {[Op.iLike]: `%${name}%`},
                },
                include: Genre
            });
            let gamesFilter = mapeoGames(searchApi.data.results)
            let gamesBuscado = gamesDb.concat(gamesFilter);
            if(gamesBuscado.length > 0){
                res.status(200).send(gamesBuscado);
            }else{
                res.status(404).send('VideoGame no encontrado')
            }
        }else{
            const games = await allGames();
            res.status(200).send(games)
        }
    } catch (error) {
        console.log(error);
    }
    
})


module.exports = router;