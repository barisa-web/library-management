import React, { useEffect, useState } from 'react'

function Users() {
    const [users,setUsers]=useState([]);
useEffect(function(){
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(function(res){
        return res.json();
    })
    .then(function(data){
        setUsers(data)
    })
},[]);

  return (
    <div>
      <h2>User List </h2>
      {users.map(function(user){
        return <p key={user.id} >{user.name}</p>;
      })}
    </div>
  );
}

export default Users