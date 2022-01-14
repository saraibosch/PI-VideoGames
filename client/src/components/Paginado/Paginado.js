import React from 'react'
import './Paginado.css';

function Paginado({videogamesPerPage, allVideogames, paginado}) {

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(allVideogames/videogamesPerPage); i++) {
        pageNumbers.push(i);
        
    }
    return (
        <nav>
            <ul className= 'paginado'>
                { pageNumbers && 
                    pageNumbers.map(number => (
                        <li className= 'number' key={number}>
                        <p onClick={() => paginado(number)}>{number}</p>
                        </li>
                    ))}
            </ul>
        </nav>
    )
}

export default Paginado
