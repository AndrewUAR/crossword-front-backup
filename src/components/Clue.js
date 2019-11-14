import React from 'react';

class Clue extends React.Component {
  render() {
    return (
      <div className="list-group-item" style={{opacity: '0.9'}}>{this.props.clue}</div>
    )
  }
}

export default Clue