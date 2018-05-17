import React, { Component } from 'react';
import ClueColumn from './clue-column';
import QuestionModal from './QuestionModal';

import { connect } from 'react-redux';

import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { categories: [] };
    this.handleClueSelection = this.handleClueSelection.bind(this);
    this.handleScoreUpdate = this.handleScoreUpdate.bind(this);
  }

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
      .then(categories => this.setState({ categories }));
  }

  handleClueSelection(clue) {
    this.setState({ selectedClue: clue });
  }

  handleScoreUpdate(amount) {
    // this.state.selectedClue.used = true;
    const { id } = this.state.selectedClue;

    // loop over each category
      // loop over each clue
        // if the clue has this id
          // set the used property
        // else
          // do nothing
    const udpatedCategories = this.state.categories.map(category => {
      category.clues = category.clues.map(clue => {
        if (clue.id === id) {
          return { ...clue, used: true };
        } else {
          return clue;
        }
      });
      return category;
    });

    this.setState({
      // categories: this.state.categories.map(cat => ({ ...cat, clues: cat.clues.map(clue => clue.id === id? {...clue, used: true} : clue)})),
      categories: udpatedCategories,
      selectedClue: null
    });
  }

  render() {
    let body = null;
    let modal = null;
    let badInput = '<h1>This could be evil</h1>';
    if (this.state.categories.length) {
      body = this.state.categories.map(category => (
          <ClueColumn category={category}
                      key={category.title}
                      handleClueSelection={this.handleClueSelection}/>
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
        <QuestionModal handleScoreUpdate={this.handleScoreUpdate}
                       clue={this.state.selectedClue}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { score: state.score };
};
export default connect(mapStateToProps)(App);
