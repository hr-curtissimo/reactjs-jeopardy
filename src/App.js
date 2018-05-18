import React, { Component } from 'react';
import ClueColumn from './clue-column';
import QuestionModal from './QuestionModal';

import { connect } from 'react-redux';

import { categoriesLoaded } from './store/actions';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  componentDidMount() {
    Promise.all([
      fetch('http://jservice.io/api/clues?category=21'),
      fetch('http://jservice.io/api/clues?category=105'),
      fetch('http://jservice.io/api/clues?category=442'),
      fetch('http://jservice.io/api/clues?category=49'),
      fetch('http://jservice.io/api/clues?category=69'),
    ])
      .then(responses => {
        const arrayOfPromises = responses.map(r => r.json());
        return Promise.all(arrayOfPromises);
      })
      .then(categoriesWithClues => categoriesWithClues.map(clues => {
        return {
          title: clues[0].category.title,
          clues: clues.filter(x => x.value).slice(0, 5)
        };
      }))
      .then(categories => this.props.dispatch(categoriesLoaded(categories)));
  }

  render() {
    let body = null;
    let modal = null;
    let badInput = '<h1>This could be evil</h1>';
    if (this.props.categories.length) {
      body = this.props.categories.map(category => (
          <ClueColumn category={category}
                      key={category.title}/>
        )
      );
    }
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <div dangerouslySetInnerHTML={{ __html: badInput }}></div>
        <h1>Score: ${ this.props.score }</h1>
        <div className="App-Board">
          { body }
          { modal }
        </div>
        <QuestionModal />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    score: state.score,
    categories: state.categories,
    selectedClue: state.selectedClue
  };
};
export default connect(mapStateToProps)(App);
