import React from 'react';
import Crossword from './Crossword';
import NewGame from './NewGame'

class Crosswords extends React.Component {
  state = {
    puzzles : [],
    puzzle: []
  }

  componentDidMount() {
    fetch(`http://localhost:3000/puzzles`)
      .then(resp => resp.json())
      .then(data => {
        this.setState({puzzles: data})
      })
  }

  createGrid = (data) => {
    const grid = data.gridLetters
    const gridnums = data.gridNumbers
    const gridBoxes = [];
    let across = 0;
    let down = 0;
    const findLetter = (id) => gridBoxes.find(grid => grid.id === id)

    for (let i = 0; i < grid.length; i++) {
      if (gridnums[i] > 0 && grid[i] !== '.' && grid[i + 15] !== '.') {
        gridBoxes.push({
          id: i,
          letter: grid[i],
          number: gridnums[i],
          across: true,
          clueAcross: across,
          clueDown: null,
          down: null,
          value: ''
        })
        if ((i + 1) % 15 === 0) across = across + 1
      } else if (grid[i] !== '.' && grid[i + 15] !== '.') {
        gridBoxes.push({
          id: i,
          letter: grid[i],
          clueAcross: across,
          clueDown: null,
          across: true,
          down: null,
          value: ''
        })
        if ((i + 1) % 15 === 0) across = across + 1
      } else if (gridnums[i] > 0 && grid[i] !== '.') {
        gridBoxes.push({
          id: i,
          letter: grid[i],
          number: gridnums[i],
          across: true,
          clueAcross: across,
          clueDown: null,
          down: null,
          value: ''
        })
        if ((i + 1) % 15 === 0) across = across + 1
      } else if (grid[i] !== '.') {
        gridBoxes.push({
          id: i,
          letter: grid[i],
          clueAcross: across,
          clueDown: 0,
          across: true,
          down: null,
          value: ''
        })
        if ((i + 1) % 15 === 0) across = across + 1
      } else {
        gridBoxes.push({
          id: i,
          letter: null
        })
        if (i !== 0 && grid[i - 1] !== '.' && grid[i] === '.') across = across + 1
      }
    }

    for (let i = 0; i < grid.length; i++) {
      if (gridnums[i] > 0 && grid[i] !== '.' && grid[i + 15] !== '.' && i < 15) {
        findLetter(i).down = true
        findLetter(i).clueDown = down
        down = down + 1
      } else if (grid[i] !== '.' && (i - 15) >= 0 && grid[i - 15] !== '.' && findLetter(i - 15).down === true) {
        findLetter(i).down = true
        findLetter(i).clueDown = findLetter(i - 15).clueDown
      } else if (gridnums[i] > 0 && grid[i] !== '.' && (i - 15) >= 0 && grid[i - 15] === '.') {
        findLetter(i).down = true
        down = down + 1
        findLetter(i).clueDown = down
      }
    }
    this.setState({
      puzzle: {
        grid: gridBoxes,
        cluesAcross: data.cluesAcross,
        cluesDown: data.cluesDown,
        opened: false
      }
    })
  }

  handleNewGame = () => {
    const newGame = this.state.puzzles[Math.floor(Math.random() * this.state.puzzles.length)]
    this.createGrid(newGame)
  }

  render(){
    console.log('render in puzzle', this.state.puzzle)
    return (
      <div className="row">
        {Object.keys(this.state.puzzle).length ?
          <Crossword puzzle={this.state.puzzle} handleNewGame={this.handleNewGame} /> : 
          <NewGame className="row" handleNewGame={this.handleNewGame}/> }
      </div>
    )
  }
}

export default Crosswords