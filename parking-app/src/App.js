import React, { useState } from 'react';

import SpacesInformation from './components/SpacesInformation'
import GetData from './clients/GetData';
import PostData from './clients/PostData';
import AddSpaceForm from './components/AddSpaceForm';
import PostReserve from './clients/PostReserve';

function App() {

  const [spaces, setSpaces] = useState([]);

  //Get Initial Data
  const initalState = GetData("http://localhost:8080/api/spaces").then((data) => setSpaces(data));

  //Add New Space
  const addSpace = (description) => {
    PostData(description)
  }

  const reservationSpace = (licensePlate) => {
    PostReserve(licensePlate)
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

            <SpacesInformation spaces={spaces} reserved={false} />

          </div>
          <div className='flex-add'>
            
            <AddSpaceForm addSpace={addSpace} reservationSpace={reservationSpace}/>

          </div>
        </div>
        <div className='flex-row'>
          <div className='flex-large'>
            <h2>Reserved</h2>

            <SpacesInformation spaces={spaces} reserved={true} />

          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
