import React from 'react';
import Box from './Box';

class Boxes extends React.Component {

    render() {
      return (
        <div>
          <h3 className='solved'>
            <span className="badge badge-light">Solved: {this.props.corrects}/{this.props.totalWords}</span>
          </h3>
          <h3 className='score'>
            <span className="badge badge-light">Score: 0</span>
          </h3>
          
          <div className="boxes">
            { 
              this.props.grid.map(box => <Box key={box.id} box={box}  
              handleInputLetter={this.props.handleInputLetter} 
              opened={this.props.opened} />)
            }
          </div>

          <div className="buttons-game">
            <button type="button" className="btn btn-primary btn-lg btn-block" 
                    onClick={(event) => this.props.handleNewGame()}>New Game</button>
            <button type="button" className="btn btn-light btn-lg btn-block" 
                    onClick={(event) => this.props.handleShowAnswers()}>Show Answers</button>
          </div>
        </div>
      )
    }
}

export default Boxes;