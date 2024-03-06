import React from 'react'
import SpinnerImg from '../../Assets/IMG/spinner.gif'

const Spinner = () => {
  return (
    <div>
        <img src={SpinnerImg} alt="spinner not found" className='d-block m-auto' style={{width:'100px'}}/>
    </div>
  )
}

export default Spinner
