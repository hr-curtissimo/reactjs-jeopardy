import React from 'react';
import renderer from 'react-test-renderer';
import ClueSquare from './ClueSquare';

test('ClueSquare shows amount', () => {
  const clue = { value: 100 };
  const component = renderer.create('<ClueSquare clue={clue}/>');

  let tree = component.toJSON();
  console.log(tree);
});
