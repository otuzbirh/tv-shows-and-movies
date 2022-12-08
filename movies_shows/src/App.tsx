import React from 'react';
import './App.css';
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import Navigation from './components/navigation/Navigation';
import Filter from './components/filter/Filter';
import Movie from './pages/movie/Movie';
import Show from './pages/show/Show';

function App() {
  return (
    <>
     <Routes>
        <Route  path='/'  element={  <Home /> } />
        <Route  path='/movie/:id'  element={  <Movie /> } />
        <Route  path='/show/:id'  element={  <Show /> } />
      </Routes>
    </>
  );
}

export default App;
