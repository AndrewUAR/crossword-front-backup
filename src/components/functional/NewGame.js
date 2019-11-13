import React from 'react';


const NewGame = props => {

    return (
      <div className="col-md-12 text-center">
        <button type="button" className="btn btn-warning btn-lg" onClick={() => props.handleNewGame()}>New Game</button>
      </div>
    )
}

export default NewGame;