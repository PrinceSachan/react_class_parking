import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import './App.css';
import CardContextProvider from './context/CardContext';
import Home from './pages/Home';
import Details from './pages/Details';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <CardContextProvider>
      <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/details' element={<Details />} />
        </Routes>
      </CardContextProvider>
      <ToastContainer />
    </div>
  );
}

export default App;
