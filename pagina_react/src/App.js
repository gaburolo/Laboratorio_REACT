import './App.css';

import React from 'react';

import { StartInformation } from './components/StartInformation';
import { ParkingClient } from './clients/ParkingClient';
import logo from './logo.svg';
import {SpacesInformation} from './components/SpacesInformation';

export class App extends React.Component {
  parkingClient = new ParkingClient();

  constructor()  {
    super();
    this.state = {
      data: [],
      startdata:[]
    }
  }
  
  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    const newData = await this.parkingClient.getSpacesData();
    const newstartData = await this.parkingClient.getStarWarsData();
    this.setState({
      data: newData,
      startdata:newstartData
    });
  }

  render() {
    return (
      <div className="App">
       
       <SpacesInformation spaces={this.state.data}></SpacesInformation>
       <StartInformation characters={this.state.startdata}></StartInformation>
      </div>
    );
  }
}

