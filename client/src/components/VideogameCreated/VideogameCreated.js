import React from 'react';
import { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link, useHistory} from 'react-router-dom';
import { getGenres, getPlatforms, postVideogames } from '../../actions';
import './VideoGameCreated.css'


function validate(input) {
    const exRegular = /^[a-zA-ZA-y\s]{3,80}$/
    let error = {};
    if (!input.name ) {
        error.name = "Nombre es requerido"
    }
    if (!exRegular.test(input.name.trim()) ){
        error.name = 'soporta solo letras y un minimo de 3 caracteres'
    }
    if (!input.description) {
        error.description = "Descripcion es requerido"
    }
    if (!input.released) {
        error.released = "Fecha de lanzamiento es requerido"
    }
    if(input.rating < 0 || input.rating > 5){
        error.rating = "El rating tiene que ser entre 0 y 5"
    }
    if (!input.platforms.length) {
        error.genres = "Plataformas es requerido"
    }
    
    return error;
}




export default function VideogameCreated(){
    const dispatch = useDispatch();
    const history = useHistory()
    const genres = useSelector((state) => state.genres);
    const platforms = useSelector((state) => state.platforms);
    const [errors, setErrors] = useState({});

    const [input, setInput] = useState({
        name: "",
        description: "",
        background_image: "",
        released: "",
        rating: 0,
        platforms: [],
        genres: []

        
    })

    function handleChangeInput(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
        
        console.log(input);
    }

    function handleSelectGenres(e){
        setInput({
            ...input,
            genres: [...input.genres, e.target.value]
        })
    }

    function handleSelectPlataforms(e){
        setInput({
            ...input,
            platforms: [...input.platforms, e.target.value]
        })
        
        
    }

    function handleSubmit(e){
        e.preventDefault(e)
        console.log(input);
        dispatch(postVideogames(input))
        alert("Videogame creado OK")
        setInput({
            name: "",
            description: "",
            background_image: "",
            released: "",
            rating: 0,
            platforms: [],
            genres: []
        })


        history.push('/home')
    }

    function handleDeletePlatform(el) {
        setInput({
            ...input,
            platforms: input.platforms.filter(platform => platform !== el)
        })
    }

    function handleDeleteGenre(el) {
        setInput({
            ...input,
            genres: input.genres.filter(genre => genre !== el)
        })
    }


    useEffect(() => {  // cuando el componente se monte -> traigo todo
        dispatch(getPlatforms())
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {  // cuando el componente se monte -> traigo todo
        dispatch(getGenres())
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className='containerVG'>
            <div>
                
                <h1>Crea tu Videogame</h1>
            </div>
            <Link to='/home'>
                <button className='volverH'>Volver a Home</button>
            </Link>
            
            

            <form onSubmit={(e) => handleSubmit(e)}>
                <div className='nombreVG'>
                    <label>Nombre:</label>
                    <input
                        type='text'
                        value={input.name}
                        name="name"
                        onChange={e => handleChangeInput(e)}
                    />

                    {
                        errors.name && (
                            <p className='error'>{errors.name}</p>
                        )
                    }
                </div>

                <div className='descriptionVG'>
                    <p className='descP'>Descripción:</p>
                    <textarea onChange={e => handleChangeInput(e)}
                        id='description'
                        value={input.description}
                        name="description"
                    />
                    {
                        errors.description && (
                            <span className='error'>{errors.description}</span>
                        )
                    }
                </div>

                <div className='imagenVG'>
                    <label>Imagen:</label>
                    <input
                        type='text'
                        value={input.background_image}
                        name="background_image"
                        onChange={e => handleChangeInput(e)}
                    />
                </div>

                <div className='releasedVG'>
                    <label>Fecha de Lanzamiento </label>
                    <input
                        type='text'
                        placeholder='dd - mm - aaaa'
                        value={input.released}
                        name='released'
                        onChange={e => handleChangeInput(e)}
                    />

                    {
                        errors.released && (
                            <p className='error'>{errors.released}</p>
                        )
                    }
                </div>

                <div className='ratingVG'>
                    <label>Rating </label>
                    <input
                        type='number'
                        placeholder="5.0"
                        step="0.1"
                        min='0'
                        max='5'
                        value={input.rating}
                        name='rating'
                        onChange={e => handleChangeInput(e)}
                    />
                    {
                        errors.rating && (
                            <p className='error'>{errors.rating}</p>
                        )
                    }
                </div>

                <div className='plataformaVG'>
                    <label>Plataformas:  </label>
                    <select onChange={e => handleSelectPlataforms(e)}>
                        {
                            platforms.map((plat) =>(
                                <option 
                                value={plat}
                                key={plat}
                                name="platforms"
                                >
                                    {plat}
                                </option>
                            ))
                        }
                    </select>
                    {
                        errors.platforms && (
                            <p className='error'>{errors.platforms}</p>
                        )
                    }
                </div>

                <div className='genreVG'>
                    <label>Generos:  </label>
                    <select onChange={e => handleSelectGenres(e)}>
                        {
                            genres.map((gen) =>(
                                <option value={gen.name} key={gen.id}>
                                    {gen.name}
                                </option>
                            ))
                        }
                    </select>
                </div>



                {/* <div>
                    <ul><li>{input.platforms.map(el => el + "--")}</li></ul>
                </div>

                <div>
                    <ul><li>{input.genres.map(el => el + "**")}</li></ul>
                </div> */}

               <div className='botonC'>
                    <button
                        disabled={errors.name || errors.description || errors.released || errors.rating || errors.platforms}
                        type="submit">
                        CREAR
                    </button>
                </div>

                {/* {
                    errors.hasOwnProperty('name') ||
                    errors.hasOwnProperty('description') ||
                    errors.hasOwnProperty('rating') ?
        
                    <p> Please Complete the Required Fields </p> :
                    <button type='submit' className='boton'> To Create! </button>
                } */}
                


            </form>
            <div className='listPlat'>
                {
                    input.platforms &&
                    input.platforms.map(el =>
                        <div className='divPlatforms'>
                            <p>{el}</p>
                            <button className='boton X'
                                onClick={() => handleDeletePlatform(el)} > X </button>
                        </div>
                    )
                }
            </div>
            
            <div className='listGenre'>
                {
                    input.genres &&
                    input.genres.map(el =>
                        <div className='divGenres'>
                            <p>{el}</p>
                            <button className='boton X'
                                onClick={() => handleDeleteGenre(el)} > X </button>
                        </div>
                    )
                }
            </div>
        </div>

    )
}