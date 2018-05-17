import React, { Component } from 'react';
import ClueColumn from './clue-column';
import QuestionModal from './QuestionModal';

import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { categories: [], score: 0 };
    this.handleClueSelection = this.handleClueSelection.bind(this);
    this.handleScoreUpdate = this.handleScoreUpdate.bind(this);
  }

  componentDidMount() {
    fetch('http://jservice.io/api/clues?category=21')
      .then(response => response.json())
      .then(clues => {
        this.setState({ categories: [{
          title: clues[0].category.title,
          clues: clues.filter(x => x.value).slice(0, 5)
        }]});
      });
  }

  handleClueSelection(clue) {
    this.setState({ selectedClue: clue });
  }

  handleScoreUpdate(amount) {
    this.setState({
      score: this.state.score + amount,
      selectedClue: null
    });
  }

  render() {
    let body = null;
    let modal = null;
    if (this.state.categories.length) {
      body = (
        <ClueColumn category={this.state.categories[0]}
                    handleClueSelection={this.handleClueSelection}/>
      );
    }
    if (this.state.selectedClue) {
      modal = (
        <QuestionModal handleScoreUpdate={this.handleScoreUpdate}
                       clue={this.state.selectedClue}/>
      );
    }
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <h1>Score: ${ this.state.score }</h1>
        { body }
        { modal }
      </div>
    );
  }
}

export default App;
