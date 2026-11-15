import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Sidebar from './assets/Sidebar'
import Dashboard from './assets/Dashboard'
import Books from './assets/Books'
import Members from './assets/Members'
import Borrowedbooks from './assets/Borrowedbooks'
import Returns from './assets/Returns'
import History from './assets/History'
import Settings from './assets/Settings'




function App() {
  return (
    
 <div className="min-h-screen">
  <Sidebar />

  <main className="ml-64 w-[calc(100%-16rem)] min-h-screen">
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/books" element={<Books />} />
      <Route path="/members" element={<Members />} />
      <Route path="/borrowedbooks" element={<Borrowedbooks />} />
      <Route path="/returns" element={<Returns />} />
      <Route path="/history" element={<History />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  </main>
</div>


  )
}

export default App