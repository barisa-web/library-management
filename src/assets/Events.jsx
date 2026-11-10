import React from 'react'

function Events() {
  function handleChange(event){
    console.log(event.target.value);
  }
  return (
    <div>
      <form >
     <input type="text"
     placeholder='enter your name'  required
      onChange={handleChange}
     />
     <p><button>submit</button></p>

      </form>
    </div>
  )
}

export default Events