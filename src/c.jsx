import React,{useState,useEffect} from 'react'

function Returns() {
    const [returns, setReturns] = useState([]);
    const [books, setBooks] = useState([]);
    const [members, setMembers] = useState([]);
   
  
    useEffect(() => {
        fetch("http://localhost:3000/returns")
            .then(response => response.json())
            .then(data => setReturns(data));
    
    fetch("http://localhost:3000/books")
        .then(response => response.json())
        .then(data => setBooks(data));
    fetch("http://localhost:3000/members")
        .then(response => response.json())
        .then(data => setMembers(data));

}, []); 
   
  return (
    <div>
    <h1 className="text-3xl font-extrabold text-slate-900 p-6 border-l-4 border-yellow-500">
  Returned Books
</h1>
     <div className="p-6 bg-slate-100 min-h-screen">
      <table className="w-full bg-white shadow-md rounded-xl">
  <thead className="bg-slate-900 text-white">
    <tr>
      <th className="p-4 text-left font-bold">Book Title</th>
      <th className="p-4 text-left font-bold">Member Name</th>
      <th className="p-4 text-left font-bold">Return Date</th>
      <th className="p-4 text-left font-bold">Status</th>
    </tr>
  </thead >

  <tbody>
    {returns.length === 0 ? (
    <tr>
        <td colSpan="4" className="p-6 text-center text-slate-500">
            No returned books found.
        </td>
    </tr>
) : (
   { returns.map((returnItem) => {
    const book = books.find(function(item) {
        return item.id === returnItem.bookId;
    });
   const member = members.find(function(item) {
    return item.id === returnItem.memberId;
});
    return (
 <tr key={returnItem.id} className="border-b border-slate-200 hover:bg-slate-100 transition">
  <td className="p-4">{book ? book.title : "Book not found"}</td>
<td className="p-4">{member ? member.name : "Member not found"}</td>
<td className="p-4">{returnItem.returnDate}</td>
<td className="p-4">
  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
    Returned
  </span>
</td>
        </tr>
    );
})}
    
)}
     </tbody>
</table>
     </div>
  </div>
  );
}

export default Returns