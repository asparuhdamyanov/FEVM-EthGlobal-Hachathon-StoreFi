import React from 'react';
import logo from './logo.svg';
import { MoralisProvider } from "react-moralis";
import { Route, Router, Routes, useLocation } from 'react-router-dom';


import './App.css';
import ListingCreation from './components/ListingCreation';
import Board from './components/Board';
import Header from './components/Header';

function App() {
  return (
    <div>
      <MoralisProvider initializeOnMount={false}>
        <Header />
          <Routes>
            <Route path='/' element = {<Board />}> </Route>
            <Route path='/newListing' element = {<ListingCreation />}> </Route>
          </Routes>
      </MoralisProvider>
    </div>
  );
}

export default App;
