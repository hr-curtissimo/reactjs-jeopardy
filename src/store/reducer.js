const initialState = {
  categories: [],
  selectedClue: null,
  score: 0
};

const reducer = (state = initialState, action) => {
  if (action.type === 'CORRECT_ANSWER') {
    return {
      ...state,
      score: state.score + action.payload
    };
  } else if (action.type === 'INCORRECT_ANSWER') {
    return {
      ...state,
      score: state.score - action.payload
    };
  }
  return state;
}

export default reducer;
