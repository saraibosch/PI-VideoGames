import React from 'react';
import {Link} from 'react-router-dom';
import './LandingPage.css';
import img from '../../img/landing1.jpg'


function LandingPage() {
    return (
        <div className='fondo'>
            <h1>Bienvenidos</h1>
            <img className='fotop' src={img} alt="hola" />
            <div className='botonL'>
                <Link to='/home'>
                    <button>Ingresar a Home</button>
                </Link>
            </div>
            
            
        </div>
    )
}

export default LandingPage
