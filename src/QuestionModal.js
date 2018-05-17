import React, { Component} from 'react';

const modalStyle = {
  position: 'fixed',
  top: 10,
  bottom: 10,
  left: 10,
  right: 10,
  backgroundColor: 'orchid',
  textAlign: 'center'
};

class QuestionModal extends Component {
  constructor(props) {
    super(props);
    this.handleCheckAnswer = this.handleCheckAnswer.bind(this);
    this.handleUpdatedAnswer = this.handleUpdatedAnswer.bind(this);
  }

  handleCheckAnswer() {
    if (this.answer.toLowerCase() === this.props.clue.answer.toLowerCase()) {
      return console.log('you win')
    }
    console.log('you lose')
  }

  handleUpdatedAnswer(event) {
    this.answer = event.target.value;
  }

  render() {
    return (
      <div style={modalStyle}>
        <h1>{ this.props.clue.value }</h1>
        <h2>{ this.props.clue.category.title }</h2>
        <div>{ this.props.clue.question }</div>
        <div>
          <input type="text"
                 placeholder="answer here..."
                 onChange={this.handleUpdatedAnswer}/>
        </div>
        <div>
          <button onClick={this.handleCheckAnswer}>What is...?</button>
        </div>
      </div>
    )
  }

}

export default QuestionModal;
