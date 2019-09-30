import React from 'react';
import GameBoard from './components/GameBoard';
import './App.css';

function App() {
  return (
    <div className="App">
      <header>
        <h1>2048</h1>
      </header>
      <main>
        <GameBoard />

      </main>
      <footer>
        
      </footer>
    </div>
  );
}

export default App;
