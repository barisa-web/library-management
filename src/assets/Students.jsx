import React, { useEffect, useState } from 'react'

function Students() {
const[students,setStudents]=useState([])
const[loading,setLoading]=useState(true)
useEffect(function(){
   fetch('https://jsonplaceholder.typicode.com/photos')
.then(function(res){
   return res.json()
})
.then(function(data){
   setStudents(data)
    setLoading(false)
})
},[]);
if (loading) {
  return <h1>Please wait........</h1>
}


  return (
    <div>

    <h1>list of Students</h1>
    {students.map(function(student){
    return (
    <div  key={student.id}className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">

    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
     <img src={student.url} alt={student.title} 
     className="w-full h-40 object-cover rounded-md c-4"/>
      <h2 className="mb-2 text-xl font-bold text-blue-700">Title:{student.name}</h2>
      <p className="text-slate-600">{student.thumbnailUrl}</p>
    </div>

    

    
  </div>
  )
    })}


    </div>
  )
}

export default Students