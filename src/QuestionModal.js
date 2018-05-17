import React, { Component} from 'react';
import { connect } from 'react-redux';

class QuestionModal extends Component {
  constructor(props) {
    super(props);
    this.answer = '';
    this.handleCheckAnswer = this.handleCheckAnswer.bind(this);
    this.handleUpdatedAnswer = this.handleUpdatedAnswer.bind(this);
  }

  handleCheckAnswer() {
    const { clue } = this.props;
    const isCorrect = this.answer.toLowerCase() === clue.answer.toLowerCase();

    let action;
    if (isCorrect) {
      action = {
        type: 'CORRECT_ANSWER',
        payload: clue.value
      };
    } else {
      action = {
        type: 'INCORRECT_ANSWER',
        payload: clue.value
      };
    }
    this.props.dispatch(action);
    this.props.handleScoreUpdate();
  }

  handleUpdatedAnswer(event) {
    this.answer = event.target.value;
  }

  render() {
    let cn = "Modal";
    if (this.props.clue) {
      cn = "Modal Modal-shown";
    }
    let clue = this.props.clue || {category: {}};
    return (
      <div className={cn}>
        <h1>{ clue.value }</h1>
        <h2>{ clue.category.title }</h2>
        <div>{ clue.question }</div>
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

export default connect()(QuestionModal);
