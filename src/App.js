import React, { Component } from 'react';
import ClueColumn from './clue-column';

import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { categories: [] };
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

  render() {
    let body = null;
    if (this.state.categories.length) {
      body = (
        <ClueColumn category={this.state.categories[0]}/>
      );
    }
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        { body }
      </div>
    );
  }
}

export default App;
