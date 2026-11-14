import React from 'react'
import { NavLink } from 'react-router-dom'

function Sidebar() {
  return (
    <div>
 
<div className="w-64 min-h-screen bg-slate-900 text-white p-5">
<h2 className="text-xl font-bold mb-10">
  LIBRARY MANAGER
</h2>
<nav className="space-y-2">
<NavLink to="/" className="block py-3 px-4 rounded-lg hover:bg-slate-700">
    <i className="fa-solid fa-gauge mr-3"></i>
    Dashboard
</NavLink>
 <NavLink to="/books" className="block py-3 px-4 rounded-lg hover:bg-slate-700">
    <i className="fa-solid fa-book mr-3"></i>
    Books
</NavLink>
    <NavLink to="/members" className="block py-3 px-4 rounded-lg hover:bg-slate-700">
    <i className="fa-solid fa-users mr-3"></i>
    Members
</NavLink>
      <NavLink to="/borrowedbooks" className="block py-3 px-4 rounded-lg hover:bg-slate-700">
        <i className="fa-solid fa-bookmark mr-3"></i>
        Borrowed Books
      </NavLink>
        <NavLink to="/returns" className="block py-3 px-4 rounded-lg hover:bg-slate-700">
          <i className="fa-solid fa-undo mr-3"></i>
          Returns
        </NavLink>
          <NavLink to="/history" className="block py-3 px-4 rounded-lg hover:bg-slate-700">
            <i className="fa-solid fa-history mr-3"></i>
            History
          </NavLink>
            <NavLink to="/settings" className="block py-3 px-4 rounded-lg hover:bg-slate-700">
              <i className="fa-solid fa-gear mr-3"></i>
              Settings
            </NavLink>
</nav>
</div>
    </div>
  )
}

export default Sidebar