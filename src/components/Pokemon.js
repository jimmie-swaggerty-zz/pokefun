import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, Link } from 'react-router-dom'
import Utilities from '../Utilities/Utilities'

const Pokemon = (props) => {
    const params = useParams()
    const [pokemon, setPokemon] = useState()
    const [spriteKeys, setSpriteKeys] = useState()
    const [otherSpriteKeys, setOtherSpriteKeys] = useState()
    const [versionsSpriteKeys, setVersionSpriteKeys] = useState()
    const [filter, setFilter] = useState(0)
    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${params.pokemonId}`)
            .then(res => {
                console.log(res.data)
                setPokemon(res.data)
                setSpriteKeys(Object.keys(res.data.sprites))
                setOtherSpriteKeys(Object.keys(res.data.sprites.other))
                setVersionSpriteKeys(Object.keys(res.data.sprites.versions))

            })
    }, [])
    return (
        <div className='container-flex'>
            {pokemon && <div>
                <div className='col-12 d-flex row-fluid justify-content-between p-3 bg-primary text-white align-items-center'>
                    <div className='col-auto pokemon-circle ms-3' style={{ backgroundImage: `url(${pokemon.sprites.front_default})` }} />
                    <div className='col ms-5'>
                        <h1 className=''>#{pokemon.order}   {Utilities.toPokemonName(params.pokemonId)}   </h1>
                    </div>
                </div>
                <div className='col-12 d-flex row g-3 p-3'>
                    <div className='col-4'>
                        <div className='card d-flex'>
                            <div className='card-header mt-0'>General Information</div>
                            <div className='card-body'>
                                <div className='col-12'><div className='w-150px d-inline-block'><strong>Height</strong></div>{Utilities.heightConvert(pokemon.height)}</div>
                                <div className='col-12'><div className='w-150px d-inline-block'><strong>Weight</strong></div>{Utilities.weightConvert(pokemon.weight)}</div>
                                <div className='col-12'><div className='w-150px d-inline-block'><strong>Types</strong></div>
                                    {pokemon.types.map(
                                        (type, i) => { return (<span>{i !== 0 && ', '}{type.type.name}</span>) })
                                    }</div>
                            </div>
                            <div className='card-header mt-0'>Stats</div>
                            <div className='card-body'>
                                {pokemon.stats.map(stat => {
                                    return (
                                        <div className='col-12'>
                                            <div className='w-150px d-inline-block'>
                                                <strong>{Utilities.convertTag(stat.stat.name)}</strong>
                                            </div>
                                            {stat.base_stat}
                                        </div>
                                    )
                                })}

                            </div>
                        </div>
                    </div>
                    <div className='col-8'>
                        <div className='card d-flex'>
                            <div className='card-header'>
                                Sprites
                                <select className="form-select" value={filter} onChange={e => { e.preventDefault(); setFilter(parseInt(e.target.value)) }}>
                                    <option value={0}>Original and Shiny</option>
                                    <option value={1}>Versions</option>
                                    <option value={2}>Other</option>
                                </select>
                            </div>
                            {/* <div className='card-header'>Original and Shiny</div> */}
                            {filter === 0 && <div className='card-body row d-flex g-3'>
                                {spriteKeys && spriteKeys.filter(obj => pokemon.sprites[obj] !== null && obj !== 'other' && obj !== 'versions').map(key => {
                                    return (<div className='col-2'>
                                        <div className='card p-0 d-flex g-3'>
                                            <img src={pokemon.sprites[key]} className='card-img-top' />
                                            <div className='card-header'>                        {Utilities.convertSpriteTag(key)}</div>
                                        </div>
                                    </div>
                                    )
                                })}
                            </div>}
                            {/* <div className='card-header'>Versions</div> */}
                            {filter === 1 && <div className='card-body row d-flex g-3'>
                                {versionsSpriteKeys && versionsSpriteKeys.map(key => {
                                    let keyVersions = Object.keys(pokemon.sprites.versions[key])
                                    return (
                                        keyVersions.map(key2 => {
                                            if (pokemon.sprites.versions[key][key2].front_default !== null) {
                                                return (
                                                    <div className='col-2'>
                                                        <div className='card p-0 d-flex g-3'>
                                                            <img src={pokemon.sprites.versions[key][key2].front_default} className='card-img-top' />
                                                            <div className='card-header'>                        {Utilities.convertTag(key2)}</div>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        })
                                    )
                                })
                                }
                            </div>}
                            {/* <div className='card-header'>Other</div> */}
                            {filter === 2 && <div className='card-body row d-flex g-3'>
                                {otherSpriteKeys && otherSpriteKeys.map(key => {
                                    if (pokemon.sprites.other[key].front_default !== null) {
                                        return (<div className='col-2'>
                                            <div className='card p-0 d-flex g-3'>
                                                <img src={pokemon.sprites.other[key].front_default} className='card-img-top' />
                                                <div className='card-header'>                        {Utilities.convertTag(key)}</div>
                                            </div>
                                        </div>
                                        )
                                    }
                                })}
                            </div>}
                        </div>
                    </div>
                </div>
                {/* <div className='col-12'>
                    {pokemon &&
                        Object.keys(pokemon.sprites).map(function (key, index) {
                            console.log(pokemon.sprites[key])
                            if (pokemon.sprites[key] !== null) {
                                return (<img src={pokemon.sprites[key]} />)
                            }
                        })
                    }
                </div> */}
            </div>}
            {/* {pokemon && <p className="text-dark">{JSON.stringify(pokemon,null, 5)}</p>} */}
        </div>
    )
}

export default Pokemon