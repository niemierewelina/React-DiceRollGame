import React, { Component } from 'react';
import Dice from "./Dice";
import "./RollDice.css"; 

class RollDice extends Component {

    constructor(props){
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            dices: [],
            round: 0, 
            totalScore: 0,
            text: "",
            history: [{
                steps: Array(30).fill(null),
                text: Array(30),
                score: Array(30)
            }],
            stepNumber: 0 
        }
    }

    componentDidMount() {
        const fetchURL = "http://roll.diceapi.com/json/30d6"; 
        fetch(fetchURL)
            .then(res => res.json())
            .then(
                json => {
                    this.setState({
                        isLoaded: true,
                        dices: json.dice,
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true, 
                        error
                    });
                }
            ); 
    }

    history = () => {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const steps = current.steps.slice();
        const text = this.state.text;
        const score = this.state.totalScore;

        this.setState({
            history: history.concat([{
                steps: steps,
                text: text,
                score: score
            }]),
            stepNumber: history.length
        });
    }

    nextRound = () => {
        const { round } = this.state;
        if(round === 29){
            this.setState((prevState) => {
                return {
                    round: 0,
                    text: "Game over! Your score: " + this.state.totalScore/10 + "/2.9",
                    totalScore: 0,
                }
            });
        } else {
            this.setState((prevState) => {
                return {
                    round: prevState.round + 1,
                }
            });
        }  
    }

    less = () => {
        this.history();
        const { dices } = this.state;
        if (this.state.round < 29 ){
            if (dices[this.state.round + 1].value <= dices[this.state.round].value) {
                this.setState((prevState) => {
                    return {
                        totalScore: Math.floor(prevState.totalScore + 1),
                        text: "Correct!"
                    }
                });
            } else {
                this.setState((prevState) => {
                    return {
                        text: "Wrong!"
                    }
                });
            }
        }
        this.nextRound();
    }

    greater = () => {
        this.history();
        const { dices } = this.state;
        if (this.state.round < 29){
            if (dices[this.state.round + 1].value > dices[this.state.round].value) {
                this.setState((prevState) => {
                    return {
                        totalScore: Math.floor(prevState.totalScore + 1),
                        text: "Correct!"
                    }
                });
            } else {
                this.setState((prevState) => {
                    return {
                        text: "Wrong!"
                    }
                });
            }
        }
        this.nextRound();
    }

    render() {
        const { error, isLoaded } = this.state;

        const history = this.state.history;

        const moves = history.map((step, move) => {
            const desc = move ?
                move + '. ' + step.text + ' Score: ' + step.score/10 : 'New game';
            return (
              <li key={move}>
                {desc}
              </li>
            );
        });

        if (error) {
            return <div>Error: {error.message} </div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return(
                <div className="roll-dices">
                    <p>You have to guess whether the next dice will have fewer or more value than the previous one. <br/>
                    If the answer is correct, you are awarded 0.1 point. The game has 30 rounds. Good luck!</p>
                    <h2>Round: {this.state.round + 1} / 30</h2>
                    <Dice index={this.state.round} dices={this.state.dices} /> 
                    <button onClick={() => this.less()}>
                        {"Less or equal?"}
                    </button>
                    <button onClick={() => this.greater()}>
                        {"Greater?"}
                    </button>
                    <h2>{this.state.text}</h2>
                    <h2>Total score: {this.state.totalScore / 10}</h2>
                    <h3>Moves history: </h3>
                    <ul>{moves}</ul>
                </div> 
            ); 
        } 
    }
}

export default RollDice;