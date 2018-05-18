import React from 'react';
import { connect } from 'react-redux';
import { clueSelected } from './store/actions';

import './clue-square.css';

const ClueSquare = props => {
  const onClickHandler = () => props.dispatch(clueSelected(props.clue))

  return (
    <div className="ClueSquare"
         onClick={onClickHandler}>
      { props.clue.value }
    </div>
  )
};

export default connect()(ClueSquare);
