import React, { Component } from 'react';
import './myStyles.css';
import Cars from './data/Cars'

class App extends Component {

  state = {
    clickedcars: [],
    score: 0,
    roundEnd: false,
    win: false,
    cars: []
  }

getCars = (Cars) => {
  let id = 1;
  const cars = Cars.map(car=>{
    let carInfo = {
      name:car,
      id:id,
      img:require(`./images/${car}.jpg`) 

    }
    id++;
    return carInfo;
  }) 

  this.setState({cars:cars});
}
componentDidMount = () => {
  this.getCars(Cars)
}

  roundReset = () => {
    let { clickedcars, score, roundEnd } = this.state

    clickedcars = []
    score = 0
    roundEnd = false

    this.setState({
      clickedcars,
      score,
      roundEnd
    })
  }

  onClick = (id) => {
    let { clickedcars, score, cars, roundEnd, win } = this.state;
    let carCount = cars.length;
    let carSelected;
    let temp;

    if (clickedcars.includes(id)) {
      roundEnd = true
      setTimeout(this.roundReset, 2000)
      clickedcars = []
      score = 0
    } else {
      score++
      clickedcars.push(id);
      if (score === carCount) {
        win = true
        roundEnd = true
        setTimeout(this.roundReset, 2000)
      }
    }


    while (carCount > 0) {
      carSelected = Math.floor(Math.random() * carCount);
      carCount--;
      temp = cars[carCount];
      cars[carCount] = cars[carSelected];
      cars[carSelected] = temp;
    }

    this.setState({
      clickedcars,
      score,
      cars,
      roundEnd,
      win
    })
  }

  render() {
    return (
      <div className="App">
        <h1>Clicky cars</h1>
        <p>Click All the cars</p>
        <h3>Score: {this.state.score}</h3>
        <div className="car-zone">
          {(this.state.roundEnd && !this.state.win) ? (<h1>You Lose!</h1>)
            :
            (this.state.roundEnd && this.state.win) ? (<h1>Congrats, You Won!</h1>)
              :
              
              (this.state.cars.map(car => (

                // <div>
              <img onClick={() => this.onClick(car.id)} key={car.id} src={car.img} alt="place holder" />
              // {/* <CarImages image = {car.img} /></div> */}
              )
              )
              )}

        </div>

      </div>
    );
  }
}

export default App;
