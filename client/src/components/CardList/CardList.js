import React from 'react'
//import { useHistory } from 'react-router-dom'
import Card from '../Card/Card'


function CardList({games}) {
    
    return (
        <div>
            <div>
                {
                    games.map(e => {
                        if(e.name !== "VideoGame no encontrado"){
                            return (
                                <Card
                                key={e.id}
                                id={e.id}
                                name={e.name}
                                background_image={e.background_image}
                                rating={e.rating}
                                genres={e.genres.map(ele => ele.name).join(' -- ')}
                                platforms={e.platforms.map(elem => elem)}
                                />
                            )
                        }else{
                            return (
                                <div>
                                    
                                   
                                    <h1>Juego no encontrado</h1>
                                </div>
                            )
                        }
                    })
                }
            </div>
            
        </div>
    )
}

export default CardList
