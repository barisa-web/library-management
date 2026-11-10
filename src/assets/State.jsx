import React, { useState } from 'react'

function State() {
   const[name,setName]=useState("Barisa")
   function handleName(){
    setName("Ali")
   }
 function handleReset(){
    setName("Barisa")
 }
   
  return (
    <div>
  <h1>student name:{name}</h1>
 <h1 onClick={handleName}>change name </h1>
   <h1 onClick={handleReset}>Reset </h1>

    </div>
  )
}

export default State