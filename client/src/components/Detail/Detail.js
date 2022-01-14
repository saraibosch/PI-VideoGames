/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { getDetail } from '../../actions';


function Detail(props) {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getDetail(props.match.params.id))
       
    }, [dispatch])

    const myVideogame = useSelector((state) => state.detail)
    //let platforms = myVideogame.platforms;
    //let genres = myVideogame.genres
    console.log(myVideogame);


    return (
        <div>
            
                
            <div>
                <h1>{myVideogame.name}</h1>
            </div>

            <div>
                <img src={myVideogame.background_image} alt='nohay imgen' />
            </div>

            <div>
                <h2>Descripción</h2>
                <p dangerouslySetInnerHTML={{ __html: myVideogame.description }} />
            </div>

            <div>
                <h2>Fecha de lanzamiento</h2>
                <h6>{myVideogame.released}</h6>
            </div>

            <div>
                <h2>Rating</h2>
                <h6>{myVideogame.rating}</h6>
            </div>
            
            <div>
                <h3>Plataformas</h3>
                {
                
                myVideogame.platforms && myVideogame.platforms?.map(elem => <span key={elem} > {elem} --</span>) 
                }

            </div>
            
            <div>
                <h3>Géneros</h3>
                {
               
                    myVideogame.genres && myVideogame.genres?.map(gen => <span key={myVideogame.id} > {gen.name} --</span>)
                }
            </div>

            

            <Link to='/home'>
                <button>Volver</button>
            </Link>
            
        </div> 
        
    )
}

export default Detail
