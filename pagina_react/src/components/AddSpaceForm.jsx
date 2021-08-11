import React from 'react';

const AddSpaceForm = (props) => {

  function onClick() {
    props.addSpace(document.getElementById('description').value)
    document.getElementById('description').value = ''
  }

  return (
    <div className='addForm'>
      <form>
      <label htmlFor="description">Description</label>
      <input type='text' name='description' id='description'/>
      <button onClick={onClick} type='button'>Add new Space</button>
    </form>
    </div>
    
  )
}

export default AddSpaceForm;