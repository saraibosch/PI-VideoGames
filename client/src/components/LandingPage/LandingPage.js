import React from 'react';
import {Link} from 'react-router-dom';
import './LandingPage.css';


function LandingPage() {
    return (
        <div className='fondo'>
            <h1>Bienvenidos a PI videogames</h1>
            <Link to='/home'>
                <button>Ingresar a Home</button>
            </Link>
        </div>
    )
}

export default LandingPage
