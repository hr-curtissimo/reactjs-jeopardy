import React, { Component} from 'react';
import { connect } from 'react-redux';
import { closeAnswerModal, correctAnswer, incorrectAnswer, playerAnswerUpdated } from './store/actions';
import { AnswerState } from './store/reducer';

class QuestionModal extends Component {
  constructor(props) {
    super(props);
    this.handleCheckAnswer = this.handleCheckAnswer.bind(this);
    this.handleUpdatedAnswer = this.handleUpdatedAnswer.bind(this);
  }

  handleCheckAnswer() {
    const { clue } = this.props;
    const isCorrect = this.props.answer.toLowerCase() === clue.answer.toLowerCase();

    let action;
    if (isCorrect) {
      action = correctAnswer(clue.value);
    } else {
      action = incorrectAnswer(clue.value);
    }
    this.props.dispatch(action);
    setTimeout((() => this.props.dispatch(closeAnswerModal())), 3000);
  }

  handleUpdatedAnswer(event) {
    this.props.dispatch(playerAnswerUpdated(event.target.value));
  }

  render() {
    let cn = "Modal";
    if (this.props.showAnswerModal) {
      cn = "Modal Modal-shown";
    }
    let clue = this.props.clue || {category: {}};
    return (
      <div className={cn}>
        <div className="QuestionModal-question">{ clue.question }</div>
        <div className="QuestionModal-answer">
          <span className="QuestionModal-answer-prefix">
            What is
          </span>
          <input type="text"
                 className="QuestionModal-answer-input"
                 placeholder="answer here..."
                 value={this.props.answer}
                 onChange={this.handleUpdatedAnswer}/>
          <button disabled={!this.props.unanswered} onClick={this.handleCheckAnswer}
                  className="QuestionModal-answer-button">Submit</button>
        </div>
        <div className="QuestionModal-result">
          { this.props.correct ? <div>CORRECT!</div> : null }
          { this.props.incorrect ? <div>The correct answer is "{this.props.clue.answer}"</div> : null }
        </div>
      </div>
    )
  }

}

const mapStateToProps = state => {
  return {
    answer: state.playersAnswer,
    correct: state.answerState === AnswerState.CORRECT,
    incorrect: state.answerState === AnswerState.INCORRECT,
    clue: state.selectedClue || {},
    showAnswerModal: state.showAnswerModal,
    unanswered: state.answerState === AnswerState.UNANSWERED,
  };
};

export default connect(mapStateToProps)(QuestionModal);
