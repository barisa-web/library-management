import React,{useState,useEffect} from 'react'

function Members() {
    const [members,setMembers]=useState([])
   const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [phone, setPhone] = useState("");
const [membershipDate, setMembershipDate] = useState("");  
   const [editingMemberId, setEditingMemberId] = useState(null);
useEffect(function () {
        fetch("http://localhost:3000/members")
            .then(response => response.json())
            .then(data => {
                setMembers(data);
            });
    }, []);
    function handleSubmit(e) {
        e.preventDefault();
        const newMember = {
            name: name,
            email: email,
            phone: phone,
            membershipDate: membershipDate
        };
        if (editingMemberId === null) {
        fetch("http://localhost:3000/members", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newMember)
        })
            .then(response => response.json())
            .then(data => {
         setMembers(function(prevMembers) {
    return [...prevMembers, data];
});
                setName("");
                setEmail("");
                setPhone("");
                setMembershipDate("");
            });
         } else {
   fetch(`http://localhost:3000/members/${editingMemberId}`, {
    method: "PUT",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(newMember)
})
    .then(response => response.json())
    .then(data => {
        setMembers(prevMembers => prevMembers.map(member => member.id === editingMemberId ? data : member));
        setEditingMemberId(null);
        setName("");
        setEmail("");
        setPhone("");
        setMembershipDate("");
    });
}  
    }
     function handleDelete(id) {
   fetch(`http://localhost:3000/members/${id}`, {
    method: "DELETE",
  })
    .then(response => {
      if (response.ok) {
        setMembers(prevMembers => prevMembers.filter(member => member.id !== id));
      } else {
        console.error("Failed to delete the member.");
      }
    })
    .catch(error => {
      console.error("Error deleting member:", error);
    });
}
function handleEdit(member) {
    setEditingMemberId(member.id);
    setName(member.name);
    setEmail(member.email);
    setPhone(member.phone);
    setMembershipDate(member.membershipDate);
}
    return (
    <div>
        <div>
            <h1 className="text-3xl font-bold p-6 text-slate-900">
                MEMBERS MANAGEMENT
            </h1>
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-xl text-sm text-gray-500 border border-gray-200 p-8 py-12 w-80 sm:w-[352px]">

    <div className="mt-4">
        <label className="block">Name</label>
        <input type="text"
        value={name} onChange={(e) => setName(e.target.value)} 
        placeholder="eg.Barisa Braitone" required
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500"/>
    </div>

    <div className="mt-4">
        <label className="block">Email</label>
        <input type="email" 
        value={email} onChange={(e) => setEmail(e.target.value)}
        placeholder="eg.thekingbrighton@gmail.com" required
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500"/>
    </div>
<div className="mt-4">
        <label className="block">Phone</label>
        <input type="tel" 
        value={phone} onChange={(e) => setPhone(e.target.value)}
        placeholder="eg.0705509978" required
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500"/>
    </div>
    <div className="mt-4">
        <label className="block">Membership Date</label>
        <input type="date" 
        value={membershipDate} onChange={(e) => setMembershipDate(e.target.value)}
        placeholder="type here" required
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500"/>
    </div>
    

    <button type="submit" className="bg-indigo-500 hover:bg-indigo-600 transition-all text-white w-full py-2 rounded-md mt-4 cursor-pointer">
        {editingMemberId === null ? "Add Member" : "Update Member"}
    </button>
</form>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
                {members.map(function (member) {
                    return (
                        <div key={member.id} className="bg-white rounded-lg shadow-xl text-sm text-gray-500 border border-gray-200 p-8 py-12 ">
                            <h2 className="text-lg font-bold mb-2 text-slate-900">{member.name}</h2>
                            <p className="mb-1"><span className="font-semibold">Email:</span> {member.email}</p>
                            <p className="mb-1"><span className="font-semibold">Phone:</span> {member.phone}</p>
                            <p className="mb-1"><span className="font-semibold">Membership Date:</span> {member.membershipDate}</p>
                     <div className="flex justify-between mt-4">
                      <button
                    onClick={function() {
    handleDelete(member.id);
}}
    className="bg-red-500 text-white px-4 py-2 rounded"
>
    
    Delete
</button >
<button onClick={function() {
    handleEdit(member);
}} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
    Edit
</button>
</div>
                        </div>
                   
                );
                }
                )}
            </div>
        </div>  
    </div>
  )
}

export default Members