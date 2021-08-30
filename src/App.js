import './App.css';
import React, { Component } from 'react';
import RollDice from "./components/RollDice"

class App extends Component {
  render() {
    return(
        <div className="App">
          <h1>Roll Dice Game</h1>
          <RollDice /> 
        </div>
    );
  }
}

export default App;
