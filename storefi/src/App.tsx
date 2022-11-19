import React from 'react';
import logo from './logo.svg';
import './App.css';
import ListingCreation from './components/ListingCreation';
import Board from './components/Board';

function App() {
  return (
    <div>
      <ListingCreation ></ListingCreation>
      <Board></Board>
    </div>
  );
}

export default App;
