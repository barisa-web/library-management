import React, { useState } from 'react'

function Update() {
    const[car,setCar]=useState({year: 2024,
                                make:"Ford",
                                model:"mustang"});

      function handleYearChange(e){
      setCar({...car,year:e.target.value})
      }  
      function handleMakeChange(e){
        setCar({...car,make:e.target.value})
      }  
      function handleModelChange(e){
        setCar({...car,model:e.target.value})
      }                          
  return (
    <div>
  <p>Your favarite car is :{car.year}{car.make}{car.model}</p>
    <input type='number' value={car.year} onChange={handleYearChange}/><br />
    <input type='text' value={car.make} onChange={handleMakeChange}/><br />
    <input type='text' value={car.model} onChange={handleModelChange}/><br />
    </div>
  )
}

export default Update