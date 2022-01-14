const initialState = {
    videogames : [], // inicio el estado de videogames en un array vacio
    allVideogames: [], 
    genres: [],
    platforms: [],
    detail: []
}



function rootReducer (state = initialState, action){

    switch (action.type) {
        case 'GET_VIDEOGAMES':
            return{
                ...state,
                videogames: action.payload,
                allVideogames: action.payload
            }
        
        case 'FILTER_BY_ORIGEN':
            const allVideogames = state.allVideogames
            const createdFilter = action.payload === 'Created' ?
                allVideogames.filter(el => el.createdInDB) :
                allVideogames.filter(el => !el.createdInDB)

            return {
                ...state,
                videogames: action.payload === 'All' ? state.allVideogames : createdFilter
            }

        case 'ORDER_BY_GAME':
            let sortedArr = action.payload === 'Asc' ?
            state.videogames.sort(function(a, b) {
                if(a.name > b.name) {
                    return 1;
                }
                if(b.name > a.name){
                    return -1
                }
                return 0;
            }) :
            state.videogames.sort(function(a, b) {
                if(a.name > b.name) {
                    return -1;
                }
                if (b.name > a.name){

                    return 1;
                } 
                return 0;
                    
            })
            return {
                ...state,
                videogames: sortedArr
            }

        case 'ORDER_BY_RATING':
            let sortedArrRat = action.payload === 'rAsc' ?
            state.videogames.sort(function(a, b) {
                return b.rating - a.rating
            }) :
            state.videogames.sort(function(a, b) {
                return a.rating - b.rating
                    
            })
            return {
                ...state,
                videogames: sortedArrRat
            }

        case 'GET_GENRES':
            return {
                ...state,
                genres: action.payload
            }

        case 'FILTER_BY_GENRES':
            var filterGenres = action.payload === 'All' ? state.allVideogames : 
            state.allVideogames.filter((videogame) => 
            videogame.genres.map((elem) => elem.name).includes(action.payload))
            return {
                ...state,
                videogames: filterGenres
            }

        case 'GET_NAME_GAMES':
            return {
                ...state,
                videogames: action.payload
            }

        case 'GET_PLATFORMS':
            return {
                ...state,
                platforms: action.payload
            }

        case 'POST_VIDEOGAMES':
            return {
                ...state   // no hacemos nada aquí xq creamos en una nueva ruta
            }

        case 'GET_DETAIL':
            return{
                ...state,
                detail: action.payload
            }

            
    
        default:
            return state;
    }

}



export default rootReducer;