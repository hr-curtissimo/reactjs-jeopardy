import React, { Component } from 'react';
import ClueColumn from './clue-column';
import QuestionModal from './QuestionModal';

import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { categories: [] };
    this.handleClueSelection = this.handleClueSelection.bind(this);
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
      modal = <QuestionModal clue={this.state.selectedClue}/>;
    }
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        { body }
        { modal }
      </div>
    );
  }
}

export default App;
