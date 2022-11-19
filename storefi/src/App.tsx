import React from 'react';
import logo from './logo.svg';
import './App.css';
import ListingCreation from './components/ListingCreation';
import Board from './components/Board';

function App() {
  return (
    <div>
      <Board></Board>
    <ListingCreation ></ListingCreation>
    </div>
  );
}

export default App;
