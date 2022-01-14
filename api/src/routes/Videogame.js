require("dotenv").config();
const axios = require('axios');
const { Router } = require('express');
const { API_KEY } = process.env;
const { Videogame, Genre } = require('../db.js');
const router = Router();

router.get('/:id', async (req, res) => {

    const {id} = req.params;
    // Los juegos de la api son numeros los de la base de datos no lo son 
    if(isNaN(id)) {
        const game = await Videogame.findByPk(id, {include: Genre })
        res.status(200).json(game)

    }else{
        const gameApi = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);

        const result = {
            id: gameApi.data.id,
            name: gameApi.data.name,
            description: gameApi.data.description,
            background_image:gameApi.data.background_image,
            released: gameApi.data.released,
            genres: gameApi.data.genres.map(gen => { return { id: gen.id, name: gen.name } }),
            rating: gameApi.data.rating,
            platforms: gameApi.data.platforms.map((el) => el.platform.name)
        }
        res.status(200).json(result)
    }

})


router.post('/', async (req, res) => {
    const { name, description, background_image, released, rating, platforms, genres, createdInDB } = req.body;

    const createdVideogame = await Videogame.create({
        name,
        description,
        background_image,
        released,
        rating,
        platforms,
        createdInDB
        

    })

    const genresDB = await Genre.findAll({
        where: {name: genres}
    })

    createdVideogame.addGenre(genresDB);

    createdVideogame ?
    res.json({msg: "Videogame creado exitosamente"}) :
    res.json({msg: "error al crear nuevo videogame"})
})





module.exports = router;