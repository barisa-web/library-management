import React from 'react'

function List() {
  const fruits = ["apple", "Mango", "Orange", "pinaple"]

  const listItems = fruits.map(function(fruit) {
    return <li>{fruit}</li>
  })

  return (
    <ol>{listItems}</ol>
  )
}

export default List