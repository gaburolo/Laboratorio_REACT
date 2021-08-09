import './App.css';

import React from 'react';
import { StarWarsCharacters } from './components/StarWarsCharacters';
import { StarWarsClient } from './clients/StarWarsClient';
import logo from './logo.svg';

export class App extends React.Component {
  starWarsClient = new StarWarsClient();

  constructor()  {
    super();
    this.state = {
      data: []
    }
  }
  
  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    const newData = await this.starWarsClient.getStarWarsData();
    this.setState({
      data: newData
    });
  }

  render() {
    return (
      <div className="App">
       
        <StarWarsCharacters characters={this.state.data}></StarWarsCharacters>
      </div>
    );
  }
}

