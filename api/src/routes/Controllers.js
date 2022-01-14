require('dotenv').config();
const axios = require('axios');
const { API_KEY } = process.env;
const { Videogame, Genre } = require('../db.js');

async function getApiInfo() {
    const apiUrl = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`);
    var requestFiltrado = mapeoGames(apiUrl.data.results);
    //entro al bendito next para traer los 100
    var nextApi = apiUrl.data.next;

    while (requestFiltrado.length < 100) {
        const actualNext = await axios.get(nextApi); 
        const newPedido = await mapeoGames(actualNext.data.results)
        requestFiltrado = [...requestFiltrado, ...newPedido];

        nextApi = actualNext.data.next

    }
    //console.log(requestFiltrado.length);
    return requestFiltrado;
}


//aqui mapeo lo que quiero traer de la api.
function mapeoGames(arr){
    const data = arr.map(g => {
        return {
            id: g.id,
            name: g.name,
            background_image: g.background_image,
            genres: g.genres.map(gen => { return {  name: gen.name } }),
            rating: g.rating,
            released: g.released,
            platforms: g.platforms.map(el => el.platform.name)
        }
    })
    return data;
}


async function getDbInfo(){
    return await Videogame.findAll({
        include: Genre
    });
}

async function allGames(){
    const api = await getApiInfo();
    const db = await getDbInfo()
    let todosGames = api.concat(db);
    return todosGames; 
}

function mapeoPlatforms(gam){
    const dataP = gam.map(g => {
        return {
            
            platforms: g.platforms.map(el => el.platform.name)
        }
    })
    return dataP;
}





module.exports = {
    getApiInfo,
    mapeoGames,
    getDbInfo,
    allGames,
    mapeoPlatforms
    
}