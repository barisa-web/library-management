import React,{useState} from 'react'
function Loginform({ onLogin }) {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
function handleLogin(e) {
    e.preventDefault();
 fetch("http://localhost:3000/admins")
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {

        const admin = data.find(function(user) {
            return user.email === email && user.password === password;
        });
     if (admin) {
    onLogin();
}
        else {
            alert("Invalid email or password!");
        }
    })
    .catch(function(error) {
        console.log("Error:", error);
    });
}
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
       <form onSubmit={handleLogin} className="bg-white rounded-lg shadow-xl text-sm text-gray-500 border border-gray-200 p-8 py-12 w-80 sm:w-[352px]">
    <p className="text-2xl font-medium text-center">
        <span className="text-indigo-500">Admin</span> Only
    </p>

    <div className="mt-4">
        <label className="block">Email</label>
        <input type="email" 
        value={email}
        onChange={function(e) {
    setEmail(e.target.value);
}}
        placeholder="type here" required
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500"/>
    </div>

    <div className="mt-4">
        <label className="block">Password</label>
        <input type="password"
         value={password}
          onChange={function(e) {
    setPassword(e.target.value);
}}
        placeholder="type here" required
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500"/>
    </div>

    <button type="submit" className="bg-indigo-500 hover:bg-indigo-600 transition-all text-white w-full py-2 rounded-md mt-4 cursor-pointer">
        Login
    </button>
</form>
    </div>
  )
}

export default Loginform