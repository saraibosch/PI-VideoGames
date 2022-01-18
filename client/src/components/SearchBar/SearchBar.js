import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameGames } from "../../actions";
import './SearchBar.css'


export default function SearchBar() {
    const dispatch = useDispatch();
    const [name, setName] = useState("");

    function handleInputChange(e) {
        e.preventDefault();
        setName(e.target.value);
        //console.log(name);
    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(getNameGames(name));
        setName("");
    }
    
    return (
        <div className="search">

            <form onSubmit={(e) => handleSubmit(e)}>
                <input 
                type="text" 
                placeholder="Buscar..."
                onChange={(e) => handleInputChange(e)}
                value={name}
                />
                <button type="submit" >Buscar</button>
            </form>
        </div>
    )
}
