import React, { Component } from "react";

class Dice extends Component {
  render() {
    const { index, dices } = this.props;
      return(
        <div className="App">
          <img src={`http://roll.diceapi.com/images/poorly-drawn/d6/${dices[index].value}.png`} alt="Dice" /> 
        </div>
      );
  }
}

export default Dice;