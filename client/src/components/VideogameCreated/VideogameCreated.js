import React from 'react';
import { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link, useHistory} from 'react-router-dom';
import { getGenres, getPlatforms, postVideogames } from '../../actions';


function validate(input) {
    let error = {};
    if (!input.name || input.name === "*" || input.name === "FROM" || input.name === "SELECT" || input.name === "$") {
        error.name = "Nombre es requerido"
    } else if (!input.description) {
        error.description = "Descripcion es requerido"
    } else if (!input.released) {
        error.released = "Fecha de lanzamiento es requerido"
    }else if(input.rating < 0 || input.rating > 5){
        error.rating = "El rating tiene que ser entre 0 y 5"
    } else if (input.platforms.length < 0) {
        error.genres = "Plataformas es requerido"
    } else if (input.genres.length < 0) {
        error.platforms = "Generos es requerido"
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
        <div>
            <Link to='/home'>
                <button>Volver a Home</button>
            </Link>

            <h1>Cra tu Videogame</h1>

            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label>Nombre:</label>
                    <input
                        type='text'
                        value={input.name}
                        name="name"
                        onChange={e => handleChangeInput(e)}
                    />

                    {
                        errors.name && (
                            <p>{errors.name}</p>
                        )
                    }
                </div>

                <div>
                    <label>description:</label>
                    <textarea onChange={e => handleChangeInput(e)}
                        id='description'
                        value={input.description}
                        name="description"
                    />
                    {
                        errors.description && (
                            <p>{errors.description}</p>
                        )
                    }
                </div>

                <div>
                    <label>Imagen:</label>
                    <input
                        type='text'
                        value={input.background_image}
                        name="background_image"
                        onChange={e => handleChangeInput(e)}
                    />
                </div>

                <div>
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
                            <p>{errors.released}</p>
                        )
                    }
                </div>

                <div>
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
                            <p>{errors.rating}</p>
                        )
                    }
                </div>

                <div>
                    <label>Plataformas:  </label>
                    <select onChange={e => handleSelectPlataforms(e)}>
                        {
                            platforms.map((plat) =>(
                                <option 
                                value={plat}
                                name="platforms"
                                >
                                    {plat}
                                </option>
                            ))
                        }
                    </select>
                </div>

                <div>
                    <label>Generos:  </label>
                    <select onChange={e => handleSelectGenres(e)}>
                        {
                            genres.map((gen) =>(
                                <option value={gen.name}>
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

                

                <button type='submit'>Crear Videogame</button>


            </form>

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

    )
}