import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Sidebar from './assets/Sidebar'
import Dashboard from './assets/Dashboard'
import Books from './assets/Books'
import Members from './assets/Members'




function App() {
  return (
    
 <div className="flex">
  <Sidebar />
  <main className="flex-1">
  <Routes>
    <Route path="/" element={<Dashboard />} />
    <Route path="/books" element={<Books />} />
    <Route path="/members" element={<Members />} />
</Routes>
  </main>
</div>
    
   


  )
}

export default App