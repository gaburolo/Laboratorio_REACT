import React, { useState, useEffect } from 'react';

import SpacesInformation from './components/SpacesInformation'
import { ParkingClient } from './clients/ParkingClient';
import GetData from './clients/GetData';
import AddSpaceForm from './components/AddSpaceForm';

  /* parkingClient = new ParkingClient();

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

    <StartInformation characters={this.state.startdata}></StartInformation>
  } */

function App() {

  const [spaces, setSpaces] = useState([]);

  //Get Initial Data
  const initialState = GetData("http://localhost/api/spaces", spaces, setSpaces);

  //Add New Space
  const addSpace = (description) => {
    console.log(description)
  }
  
  return (
    <div className="App">
      <div className='container'>
        <h1>Taller React</h1>
        <div className='flex-row'>
          <div className='flex-large'>
            <h2>Availables</h2>

            <SpacesInformation spaces={spaces} reserved={false}/>

          </div>
          <div className='flex-large'>
            <h2>Añadir parqueo</h2>

            <AddSpaceForm addSpace={addSpace}/>

          </div>
        </div>
        <div className='flex-row'>
          <div className='flex-large'>
            <h2>Reserved</h2>

            <SpacesInformation spaces={spaces} reserved={true}/>

          </div>
        </div>
      </div>
    </div>
  );
}
export default App;

