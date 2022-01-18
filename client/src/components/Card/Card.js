import React from 'react';
import './Card.css'


function Card({name, background_image, genres, rating}) {
    return (
        
        <div className='card'>
           
                <h3 className='namet'>{name}</h3>
               
                    <img className='img' src={background_image ? background_image : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpfTuch8F_PkEaqS6nATu1Bwm6ppJrPcghMg&usqp=CAU"} alt={name} /* width='200px' height='250px'  *//>
                
                    
                <h4>Géneros: {genres.map(el => el.name).join(' -- ')}</h4>
                <h4>Rating: {rating}</h4>
          
            
        </div>
    )
}

export default Card
