import React, { useState, useEffect } from 'react';

import SpacesInformation from './components/SpacesInformation'
import GetData from './clients/GetData';
import PostData from './clients/PostData';
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
  GetData("http://localhost/api/spaces", spaces, setSpaces);

  //Add New Space
  const addSpace = (description) => {
    PostData(description)
  }

  const setReserved = (space, value) => {
    const newSpace = {
      id: space.id, state: space.state, detalle: space.detalle, vehiculo: space.vehiculo, placa: space.placa, horaIngreso: space.horaIngreso, reservado: value
    }
    setSpaces(spaces.map((space) => (space.id === newSpace.id ? newSpace : space)))
  }

  return (
    <div className="App">
      <header>
        <h1>Taller React</h1>
      </header>
      <div className='container'>
        <div className='flex-row'>
          <div className='flex-large'>
            <h2>Availables</h2>

            <SpacesInformation spaces={spaces} reserved={false} setReserved={setReserved}/>

          </div>
          <div className='flex-add'>
            <h2>Añadir parqueo</h2>

            <AddSpaceForm addSpace={addSpace}/>

          </div>
        </div>
        <div className='flex-row'>
          <div className='flex-large'>
            <h2>Reserved</h2>

            <SpacesInformation spaces={spaces} reserved={true} setReserved={setReserved}/>

          </div>
        </div>
      </div>
    </div>
  );
}
export default App;

