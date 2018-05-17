import React from 'react';
import ClueSquare from './ClueSquare';

const titleStyle = {
  width: '100px',
  fontSize: '14px',
  fontWeight: 100,
  fontFamily: 'Arial Narrow'
};

const ClueColumn = props => {
  return (
    <div>
      <div style={titleStyle}>{ props.category.title }</div>
      { props.category.clues.map(x => <ClueSquare key={x.id} clue={x} />) }
    </div>
  );
};

export default ClueColumn;
