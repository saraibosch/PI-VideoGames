import React from 'react'
import { Link } from 'react-router-dom'

function ErrorGame() {
    return (
        <div>
            <div>
                <h1>Video jauego no encotrado desde errorGame</h1>
                <Link to={'/home'}> 
                    <button>Volver a home</button>
                </Link>
            </div>
        </div>
    )
}

export default ErrorGame
