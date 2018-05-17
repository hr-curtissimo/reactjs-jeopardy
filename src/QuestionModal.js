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
    this.answer = '';
    this.handleCheckAnswer = this.handleCheckAnswer.bind(this);
    this.handleUpdatedAnswer = this.handleUpdatedAnswer.bind(this);
  }

  handleCheckAnswer() {
    const { clue } = this.props;
    if (this.answer.toLowerCase() === clue.answer.toLowerCase()) {
      return this.props.handleScoreUpdate(clue.value);
    }
    this.props.handleScoreUpdate(-clue.value);
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
