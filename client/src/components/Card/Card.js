import React from 'react'
import { Link } from 'react-router-dom'

function Card({name, background_image, genres, rating, id}) {
    return (
        
        <div>
            <h3>{name}</h3>
            <img src={background_image ? background_image : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpfTuch8F_PkEaqS6nATu1Bwm6ppJrPcghMg&usqp=CAU"} alt={name} width='200px' height='250px' />
            <h4>{genres}</h4>
            <h4>{rating}</h4>
            <Link to={'/videogame/' + id}>
                <button>Ver VideoGame</button>
            </Link>
        </div>
    )
}

export default Card
