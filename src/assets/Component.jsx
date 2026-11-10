import React, { useState } from 'react'

function Component() {
const [name,setName]=useState("Guest")
const [quantity,setQuantity]=useState("1")
const [comment,setComment]=useState("")
const [payment,setPyment]=useState("")
const[shipping,setShipping]=useState("")
function handleChangeName(e){
    setName(e.target.value);
}
function handleQuantity(e){
    setQuantity(e.target.value);
}
function handleComment(e){
    setComment(e.target.value)
}
function handlePayment(e){
    setPyment(e.target.value);

}
function handleShipping(e){
 setShipping(e.target.value)
}



  return (
   <div>
  <input
    value={name}
    onChange={handleChangeName}
  />
  <p>Name: {name}</p>

  <input
  value={quantity}
  onChange={handleQuantity}type="number"
  />
  <p>Quantity:{quantity}</p>
  <textarea 
  value={comment}
  onChange={handleComment}
  placeholder="enter delivary instruction"
  />
  <p>Comment:{comment}</p>
  <select  value={payment} onChange={handlePayment}>
   < option value=""> Select an option </option>
    < option value="visa"> Visa </option>
     < option value="mastercard"> mastercard </option>
      < option value="Gitcard"> Gitcard</option>
  </select>
  <p>payment:{payment}</p>
  <label>
    <input type="radio" value="Pick up"
    checked={shipping==="Pick up"}
    onChange={handleShipping}
    />

    pick up
    <br />
  </label>
   <label>
     <input type="radio" value="Delivary"
    checked={shipping==="Delivary"}
    onChange={handleShipping}
    />
    Delivary
  </label>
  <p>Shipping:{shipping}</p>
</div>
  )
}

export default Component