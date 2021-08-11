import React from 'react';

const AddSpaceForm = (props) => {

  function AddNewSpace() {
    props.addSpace(document.getElementById('description').value)
    document.getElementById('description').value = ''
  }

  function ReserveSpace() {
    props.reservationSpace(document.getElementById('licensePlate').value)
    document.getElementById('licensePlate').value = ''
  }

  return (
    <div className='addForm'>
      <h2>Add New Spaces</h2>
      <div>
        <form>
          <label htmlFor="description">Description</label>
          <input type='text' name='description' id='description'/>
          <button onClick={AddNewSpace} type='button'>Add new Space</button>
        </form>
      </div>
      <br />
      <h2>Reserve Space</h2>
      <div>
        <form>
          <label htmlFor="description">License Plate</label>
          <input type='text' name='description' id='licensePlate'/>
          <button onClick={ReserveSpace} type='button'>Reserve Space</button>
        </form>
      </div>
    </div>
  )
}

export default AddSpaceForm;