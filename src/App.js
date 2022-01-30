import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './App.scss';
import NavBar from './layout/NavBar';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import Generation from './components/Generation';
import Pokemon from './components/Pokemon';

function App() {
  const [generations, setGenerations] = useState()
  const [selectedGeneration, setSelectedGeneration] = useState()
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<h1>Home</h1>} />
          <Route path="generations/:generationName" element={<Generation />} />
          <Route path="pokemon/:pokemonId" element={<Pokemon />} />
        </Routes>
      </Router>
    </div >
  );
}

export default App;
