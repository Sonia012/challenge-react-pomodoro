import React, { Component } from 'react';
import Moment from 'react-moment';
import './App.css';

const Header = () => <h1>Pomodoro</h1>

const ShowTimer = ({ time, handleClick }) => (
  <div className='Timer'>
      <h1>Session</h1>
      <div className='SetTimer-controls'>
        <button id='decrement' onClick={() => handleClick(false)}>&#9660;</button>
        <h1>{time}</h1>
        <button id='increment' onClick={() => handleClick(true)}>&#9650;</button>
      </div>
  </div>
)
//Start-Reset button
const StartReset = ({ active, handlePlayReset }) => (
  <div className='Start-Reset'>
    <button id="start-reset" onClick={handlePlayReset}>
      { active ? <span>&#8635;</span> : <span>&#9654;</span>}
    </button>
  </div>
)

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
        //20 minutes => *60 * 1000 = milliseconds
        sessionTime: 20 * 60 * 1000,
        active: false
    }
  }

  //role of the increment/decrement buttons
  handleSetTimer = (inc) => {
    //if sessionTime is 59 minutes and "inc"=true (see handleClick parameter in const ShowTimer), then break (=return) the code (we don't want to go beyond 59 minutes)
    if(this.state.sessionTime === 59 * 60 * 1000 && inc) return
     //if sessionTime is 1 minute and "inc"=false (see handleClick parameter in const ShowTimer), then break the code (we don't want to go below 1 minute)
    if(this.state.sessionTime === 1 * 60 * 1000 && !inc) return 
    //otherwise, increase or decrease the timer by 1 minute (= 60*1000 milliseconds)
    this.setState({ sessionTime: this.state.sessionTime + (inc ? 60*1000 : -60*1000) })
  }

  handlePlayReset = () => {
    if(this.state.active) {
      //if state = active (= playing), then we show the reset button. The reset button resets the original timer values
      //but also stops the timer (= clearInterval)
      this.setState({ sessionTime: 20 * 60 * 1000, active: false })
      clearInterval(this.pomodoro)
      //else, if the state is not active, we show the play button and decrease the timer by 1 second (1000 milliseconds) every 1 second
    } else {
          this.setState({
            active: true }, () => this.pomodoro = setInterval(() => this.setState({ sessionTime: this.state.sessionTime - 1000 }), 1000)
          )
      }
    //disable 'increment' and 'decrement' buttons
    if(!this.state.active) {
      document.getElementById('increment').disabled = true
      document.getElementById('decrement').disabled = true
    } else {
      document.getElementById('increment').disabled = false
      document.getElementById('decrement').disabled = false
    }
  }

  // Stop the timer when it reaches 0 (not working yet)
  componentDidUpdate() {
    console.log(this.state)
    if(this.state.sessionTime === 0) {
      clearInterval(this.pomodoro)
    }
  }

  render() {
    return (
      <div className="App">
        <Header />
        <ShowTimer time={<Moment format="mm:ss">{this.state.sessionTime}</Moment>} handleClick={this.handleSetTimer} />
        <StartReset active={this.state.active} handlePlayReset={this.handlePlayReset} />
      </div>
    );
  }
}

export default App;
