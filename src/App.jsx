import { useState } from 'react'
import './style/App.css'
import HomeScreen from './screens/HomeScreen'; 
import SecondScreen from './screens/SecondScreen';
import ThirdScreen from './screens/ThirdScreen';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/pelicula/:id" element={<SecondScreen />} /> 
        <Route path="/reserva/:id" element={<ThirdScreen />} /> 
      </Routes>
    </BrowserRouter>
  );
}
export default App
