/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { getDetail } from '../../actions';
import './Detail.css'

function Detail(props) {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getDetail(props.match.params.id))
       
    }, [dispatch])

    const myVideogame = useSelector((state) => state.detail)
    //let platforms = myVideogame.platforms;
    //let genres = myVideogame.genres
    //console.log(myVideogame);


    return (
        <div className='container'>
            
                
            <div className='titulo'>
                <h1>{myVideogame.name}</h1>
            </div>

            <div className='imagen'>
                <img src={myVideogame.background_image} alt='no hay imagen' />
            </div>

            <div className='descripcion'>
                <div className='descText'>
                    <h2>Descripción</h2>
                    <p dangerouslySetInnerHTML={{ __html: myVideogame.description }} />
                </div>
            </div>

            <div className='platGen'>
                <div className='platGenText'>
                    <h3>Plataformas</h3>

                    {
                    
                    myVideogame.platforms && myVideogame.platforms?.map(elem => <span key={elem} > {elem} --</span>) 
                    }

                
                    <h3>Géneros</h3>
                    {
                
                        myVideogame.genres && myVideogame.genres?.map(gen => <span key={gen.id} > {gen.name} --</span>)
                    }
                </div>
            </div>

            <div className='ratLanz'>
                <div className='ratLanText'>
                    <div>
                        <h3>Fecha de lanzamiento: </h3>
                        {
                        myVideogame.released
                        }
                    </div>
                    <div>
                        <h3>Rating: </h3>
                        {
                        myVideogame.rating
                        }
                    </div>
            
                </div>
            </div>
            
            

            <div className='botonVolver'>

                <Link to='/home'>
                    <button>Volver</button>
                </Link>
            </div>
            
        </div> 
        
    )
}

export default Detail
