import React from 'react';
import ClueSquare from './ClueSquare';
import ZombieSquare from './zombie-square';

const titleStyle = {
  width: '100px',
  fontSize: '2em',
  fontWeight: 100,
  fontFamily: 'Arial Narrow'
};

const ClueColumn = props => {
  return (
    <div>
      <div style={titleStyle}>{ props.category.title }</div>
      { props.category.clues.map(x => (
        x.used ?
        <ZombieSquare key={x.id} /> :
        <ClueSquare key={x.id} clue={x}/>
      )) }
    </div>
  );
};

export default ClueColumn;
