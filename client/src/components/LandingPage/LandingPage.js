import React from 'react';
import {Link} from 'react-router-dom';
import './LandingPage.css';


function LandingPage() {
    return (
        <div className='fondo'>
            <h1>Bienvenidos a PI videogames</h1>
            <Link to='/home'>
                <butt>Ingresar a Home</butt>
            </Link>
        </div>
    )
}

export default LandingPage
