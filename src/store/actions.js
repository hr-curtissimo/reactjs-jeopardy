export const ActionTypes = {
  CATEGORIES_LOADED: 'CATEGORIES_LOADED',
  CLOSE_ANSWER_MODAL: 'CLOSE_ANSWER_MODAL',
  CLUE_SELECTED: 'CLUE_SELECTED',
  CORRECT_ANSWER: 'CORRECT_ANSWER',
  INCORRECT_ANSWER: 'INCORRECT_ANSWER',
  PLAYER_ANSWER_UPDATED: 'PLAYER_ANSWER_UPDATED',
};

export const categoriesLoaded = categories => {
  return {
    type: ActionTypes.CATEGORIES_LOADED,
    payload: categories
  };
};

export const closeAnswerModal = () => {
  return {
    type: ActionTypes.CLOSE_ANSWER_MODAL
  };
}

export const clueSelected = clue => {
  return {
    type: ActionTypes.CLUE_SELECTED,
    payload: clue
  };
};

export const correctAnswer = value => {
  return {
    type: ActionTypes.CORRECT_ANSWER,
    payload: value
  };
};

export const incorrectAnswer = value => {
  return {
    type: ActionTypes.INCORRECT_ANSWER,
    payload: value
  };
};

export const playerAnswerUpdated = value => {
  return {
    type: ActionTypes.PLAYER_ANSWER_UPDATED,
    payload: value
  }
}
