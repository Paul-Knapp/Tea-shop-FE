import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Homepage from './HomePage/Homepage.jsx';
import NavBar from './NavBar/NavBar.jsx';

function App() {
  return (
    <Routes>
      <Route path="/subscriptionid" />
      <Route path="/" element={<Homepage />} />
    </Routes>
  )
}

export default App
