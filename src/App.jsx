import React from 'react';
import GameBoard from './components/GameBoard';
import './App.css';

function App() {
  return (
    <div className="App">
      <header>
        <h1>2048</h1>
        <p>Use the arrow keys to join the numbers and get the <span>2048</span> tile!</p>
      </header>
      <main>
        <GameBoard />

      </main>
    </div>
  );
}

export default App;
