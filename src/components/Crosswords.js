import React from 'react';
import Crossword from './Crossword';
import NewGame from './functional/NewGame';
import {Route, withRouter} from "react-router-dom";
import axios from 'axios';
import Nav from './functional/Nav';
import { Link } from 'react-router-dom'

class Crosswords extends React.Component {
  state = {
    puzzle: []
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
    console.log('boxes', gridBoxes)
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
    // this.props.history.push("/crossword")
    console.log('Im inside function', this.props)
    const newGame = this.state.puzzles[Math.floor(Math.random() * this.state.puzzles.length)]
    console.log('new game', newGame)
    this.createGrid(newGame)
  }

  render(){
    console.log('render in puzzle', this.props)
    return (
      <div>
        <div><Nav /></div>
        <div className="row">
          
        </div>
      </div>
    )
  }
}

export default withRouter(Crosswords)