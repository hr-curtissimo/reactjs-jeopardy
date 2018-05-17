import React from 'react';

import './clue-square.css';

const ClueSquare = props => {
  const onClickHandler = () => props.handleClueSelection(props.clue);

  return (
    <div className="ClueSquare"
         onClick={onClickHandler}>
      { props.clue.value }
    </div>
  )
};

export default ClueSquare;
