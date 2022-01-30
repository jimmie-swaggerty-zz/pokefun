import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Utilities from '../Utilities/Utilities'

const Generation = (props) => {
    const params = useParams()
    const navigate = useNavigate()
    const [selectedGenerationInfo, setSelectedGenerationInfo] = useState()

    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/generation/${params.generationName}`)
            .then(res => {
                let results = res.data.pokemon_species
                results.forEach(obj => {
                    obj.pokemonId = obj.url.substr(42).replace("/", "")
                })
                console.log(results)
                setSelectedGenerationInfo(results)
            })
    }, [params])
    return (
        <div>
            <h1 className="mb-3 bg-primary text-white p-3">{Utilities.toGenName(params.generationName)}</h1>
            <div className='d-flex row g-4 p-4'>
                {selectedGenerationInfo && selectedGenerationInfo.sort((a, b) => { return a.pokemonId - b.pokemonId }).map(pokemon => {
                    console.log(pokemon)
                    let pokemonId = pokemon.url.substr(42).replace("/", "")
                    return (
                        <div className='col-lg-2 col-md-3 col-4'>
                            <div className='card' onClick={e => { e.preventDefault(); navigate(`../pokemon/${pokemon.name}`) }}>
                                <div className='btn btn-primary text-white'>
                                    <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`} className='card-img-top' />
                                    <p className='card-title'><span className="badge bg-light text-primary me-2">{pokemonId}</span>{Utilities.toPokemonName(pokemon.name)}</p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Generation