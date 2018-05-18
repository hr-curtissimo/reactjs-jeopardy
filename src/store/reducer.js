import { ActionTypes } from './actions';

export const AnswerState = {
  UNANSWERED: 'UNANSWERED',
  CORRECT: 'CORRECT',
  INCORRECT: 'INCORRECT',
}

const initialState = {
  categories: [],
  selectedClue: null,
  score: 0,
  playersAnswer: '',
  showAnswerModal: false,
  answerState: AnswerState.UNANSWERED,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.CATEGORIES_LOADED: {
      return {
        ...state,
        categories: [...action.payload],
      };
    }
    case ActionTypes.CLOSE_ANSWER_MODAL: {
      return {
        ...state,
        selectedClue: null,
        showAnswerModal: false,
      }
    }
    case ActionTypes.CLUE_SELECTED: {
      return {
        ...state,
        playersAnswer: '',
        selectedClue: action.payload,
        showAnswerModal: true,
        answerState: AnswerState.UNANSWERED,
        categories: state.categories.map(category => {
          return {
            ...category,
            clues: category.clues.map(clue => {
              return clue.id !== action.payload.id
                     ? clue
                     : { ...clue, used: true }
            }),
          }
        }),
      };
    }
    case ActionTypes.CORRECT_ANSWER: {
      return {
        ...state,
        score: state.score + action.payload,
        answerState: AnswerState.CORRECT,
      };
    }
    case ActionTypes.INCORRECT_ANSWER: {
      return {
        ...state,
        score: state.score - action.payload,
        answerState: AnswerState.INCORRECT,
      };
    }
    case ActionTypes.PLAYER_ANSWER_UPDATED: {
      return {
        ...state,
        playersAnswer: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}

export default reducer;
