/* eslint-disable no-unused-vars */
import React from 'react';
import { useEffect, useState} from 'react'; //useEffect llena el estado cuando se monta el componente
import { useDispatch, useSelector } from 'react-redux';
import { getVideogames, filterByOrigen, orderByGame, orderByRating, getGenres, filterByGenres } from '../../actions';
import {Link} from 'react-router-dom';
import Card from '../Card/Card';
import Paginado from '../Paginado/Paginado';
import SearchBar from '../SearchBar/SearchBar';
import './Home.css'



function Home() {

    const dispatch = useDispatch();
    const allVideogames = useSelector((state) => state.videogames) // me traigo todo lo que esta en estado de videogames
    const genres = useSelector(state => state.genres)

    const [order, setOrder] = useState('')

    /* PAGINADO */
    const [currentPage, setCurrentPage] = useState(1); //estado con la pagina actual y otro estado que me setee la pagina actual
    const [videogamesPerPage, setVideogamesPerPage] = useState(15); //cuantos VG por pagina y setear los VG por pagina
    const indexOfLastVideogame = currentPage * videogamesPerPage; // pagibna actual por la cantidad de VG por pagina
    const indexOfFirstVideogames = indexOfLastVideogame - videogamesPerPage // indice del ultimo VG menos los VG por pagina
    let currentVideogames = allVideogames.slice(indexOfFirstVideogames, indexOfLastVideogame) //traigo el arreglo con todos los VG y le paso el slice para agarre ese array y tome la porcion de lo que le paso por parametro

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect (() => {
        dispatch(getVideogames());
    },[dispatch])

    useEffect(() => {  // cuando el componente se monte -> traigo todo
        dispatch(getGenres())
    }, [dispatch]);

    function handleClick(e){
        e.preventDefault()
        dispatch(getVideogames())
    }

    function handleFilterByOrigen(e){
        dispatch(filterByOrigen(e.target.value))

    }

    function handleSort(e){
        e.preventDefault()
        dispatch(orderByGame(e.target.value))
        setCurrentPage(1)
        setOrder(`Ordenado ${e.target.value}`)
    }

    function handleSortRating(e){
        e.preventDefault()
        dispatch(orderByRating(e.target.value))
        setCurrentPage(1)
        setOrder(`Orden ${e.target.value}`)
    }

    function handleFilterByGenres(e) {
        dispatch(filterByGenres(e.target.value))
        
    };
     




    return (
        <div>
            <div>
                <h1>VIDEOSGAMES APP</h1>
            </div>
            <div className='createL'>
                <Link to= '/videogame'>
                    <button>
                    Crear nuevo videogame
                    </button>
                </Link>
            </div>

            
            <div className='cargarVG'>
                <button onClick={e => {handleClick(e)}}>
                    Volver a cargar los juegos
                </button>
            </div>

            <div>
                {/* ORDENAMIENTO ASCENDENTE Y DESCENDENTE */}
                <select className='selectsOF' onChange={e => handleSort(e)}>
                    <option value='All'>Ordenar A-Z</option>
                    <option value='Asc'>Ascendente</option>
                    <option value='Desc'>Descendente</option>
                </select>

                {/* ORDENAMIENTO POR RATING */}
                <select className='selectsOF' onChange={e => handleSortRating(e)}>
                    <option value='null'>Select Rating </option>
                    <option value='rAsc'>Rating mayor </option>
                    <option value='rDesc'>Rating menor </option>
                </select>

                {/* FILTRADO POR VG EXISTENTES(API) O CREADOS(BD) */}
                <select className='selectsOF' onChange={e => handleFilterByOrigen(e)}>
                    <option value={'All'}>Todos</option>
                    <option value={'Created'}>Creados</option>
                    <option value={'Api'}>Existentes</option>
                </select>

                {/* FILTRADO POR GENEROS */}
                <select className='selectsG' onChange={e => handleFilterByGenres(e)}>
                    <option value='All'>Todos Los Géneros ...</option>
                    {
                        genres?.map(el => (
                            <option
                                key={el.id}
                                value={el.name}>{el.name}
                            </option>
                        ))
                    }
                    
                </select>

                <SearchBar />

                <Paginado
                    videogamesPerPage={videogamesPerPage}
                    allVideogames={allVideogames.length}
                    paginado={paginado}
                />

                
                
                    <div className='cardHome'>

                    
               
                        {
                            currentVideogames?.map((el) => {
                                return (
                                    <div className='cardsContainer' key={el.id}>
                                        <Link to={'/videogame/' + el.id} >
                                            <Card name={el.name} 
                                                background_image={el.background_image}
                                                genres={el.genres} 
                                                rating={el.rating}
                                                
                                            />
                                        </Link>
                                    </div>
                                )
                                
                            })
                        }
                    </div>
                
                
                
                
            </div>

        </div>
    )
}

export default Home
