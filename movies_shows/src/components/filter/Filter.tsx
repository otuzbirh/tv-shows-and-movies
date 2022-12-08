import React from 'react'
import './Filter.css'

function Filter(props: any) {

  
  return (
    <div className='filter'>
    <div className='inputDiv'>
    <input className='input' 
           name='value'  
           onChange={props.handleChange}
           type="text" 
           placeholder='Search...' />
    <button className='filter-btn'>   </button>
    <div className='show-results'>
      {props.searchResults}
    </div>
    </div>
    </div>
  )
}



export default Filter