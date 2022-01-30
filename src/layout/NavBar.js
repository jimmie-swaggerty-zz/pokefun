import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { NavLink, useNavigate } from "react-router-dom";
import Utilities from '../Utilities/Utilities';

const NavBar = (props) => {
    const [generations, setGenerations] = useState()
    useEffect(() => {
        axios.get('https://pokeapi.co/api/v2/generation/')
            .then(res => {
                console.log(res.data.results)
                setGenerations(res.data.results)
            })
    }, [])
    return (
        <div className=''>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div class="container-fluid">
                    <a class="navbar-brand col-auto" href="#">PokeOh!</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav row d-flex justify-content-between w-100">
                        <li class="col-auto nav-item">
                                        <NavLink className='nav-link' to={`/`}>Home</NavLink>
                                    </li>
                            {generations && generations.map(gen => {
                                return (
                                    <li class="col-auto nav-item">
                                        <NavLink className='nav-link' to={`/generations/${gen.name}`}>{Utilities.toGenName(gen.name)}</NavLink>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}
export default NavBar