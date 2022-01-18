import axios from 'axios';

export function getVideogames() {
    return async function (dispatch) {
        try {

            var json = await axios.get('http://localhost:3001/videogames');
            
            return dispatch({
                type: 'GET_VIDEOGAMES',
                payload: json.data
            })
            
        } catch (error) {
            console.log(error);
        }
        
    }
}

export function filterByOrigen(payload){ // el payload es opcion value que se elija
    return {
        type: 'FILTER_BY_ORIGEN',
        payload
    }
}

export function orderByGame(payload) {
    return {
        type: 'ORDER_BY_GAME',
        payload
    }
}

export function orderByRating(payload) {
    return {
        type: 'ORDER_BY_RATING',
        payload
    }
}

export function getGenres() {
    return async function(dispatch) {
        try {
            var urlGenres = await axios.get('http://localhost:3001/genre');
            return dispatch({
                type: 'GET_GENRES',
                payload: urlGenres.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export function filterByGenres(payload) {
    return {
        type: 'FILTER_BY_GENRES',
        payload
    }
}

export function getNameGames(name){
    return async function (dispatch) {
        try {
            var json = await axios.get('http://localhost:3001/videogames?name=' + name)
            return dispatch({
                type: 'GET_NAME_GAMES',
                payload: json.data
            })
        } catch (error) {
            alert('Videogame no encontrado')
            console.log(error);
        }
    }

}

export function getPlatforms(){
    return async function(dispatch) {
        var info = await axios.get("http://localhost:3001/platforms");
        console.log(info);

        return dispatch({
            type: 'GET_PLATFORMS',
            payload: info.data
        })
    }
}

export function postVideogames(payload){
    return async function (dispatch){
        var response = await axios.post('http://localhost:3001/videogame',payload);
        console.log(response);
        return response;
    }
}

export function getDetail(id){
    return async function(dispatch){
        try {
            var response = await axios.get('http://localhost:3001/videogame/' + id);
            //console.log(response);
            return dispatch({
                type: 'GET_DETAIL',
                payload: response.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}