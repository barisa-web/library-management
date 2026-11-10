import React, { useState } from 'react'

function Color() {
    const [color,setColor]=useState("#fffff")

    function handleColor(e){
        setColor(e.target.value)
    }

    
  return (
    <div className='container'>
        <h1>Color Picker</h1>
        <div className='color-display' style={{background:color}}>
            <p>Selected color:{color}</p>

        </div>
     <label>Select a color</label>
     <input type="color" value={color}  onChange={handleColor}/>
    </div>
  )
}

export default Color