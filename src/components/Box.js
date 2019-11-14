import React from 'react';

class Box extends React.Component {
  

  render() {
    // console.log('state value', this.state.value)
    console.log('props open', this.props)
  
    if (!this.props.box.letter) {
      return (
        <div className="box blank"></div>
       )
    }else if (this.props.box.number) {
      return (
        <div className={"box-wrapper"}>
          <label className="box-label box-label--number">{this.props.box.number}</label>
          <input type="text" 
                maxLength = "1"
                className = "box"
                value = {
                  this.props.opened ? this.props.box.letter : this.props.box.value
                }
                onChange={(event) => this.props.handleInputLetter(event.target.value, this.props.box)} />
        </div>
      )
    } else {
      return (
        <input type="text" 
              maxLength = "1"
              className="box box-text" 
              value = {
                this.props.opened ? this.props.box.letter : this.props.box.value  
              }
              onChange={(event) => this.props.handleInputLetter(event.target.value, this.props.box)}  />
      )
    }
  }
}

export default Box;