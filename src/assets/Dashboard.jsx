
import React, { useState ,useEffect } from 'react'


function Dashboard() {
  const [totalBooks, setTotalBooks] = useState(0);
  const[totalMembers, setTotalMembers] = useState(0);
  const[borrowedBooks, setBorrowedBooks]=useState(0);
  const[overdueBooks, setOverdueBooks]=useState(0);
  const [recentBorrowings, setRecentBorrowings] = useState([]);
  const [books, setBooks] = useState([]);
const [members, setMembers] = useState([]);
  useEffect(function () {
  fetch("http://localhost:3000/books")
    .then(response => response.json())
    .then(data => {
      setTotalBooks(data.length);
      setBooks(data);
    });
}, []);
useEffect(function () {
  fetch("http://localhost:3000/members")
    .then(response => response.json())
    .then(data => {
      setTotalMembers(data.length);
      setMembers(data);
    });
}, []);
useEffect(function () {
  fetch("http://localhost:3000/borrowings")
    .then(response => response.json())
    .then(data => {

      const today = new Date();
      const todayDate = today.getFullYear() + "-" +
        String(today.getMonth() + 1).padStart(2, "0") + "-" +
        String(today.getDate()).padStart(2, "0");

      const borrowed = data.filter(function (borrowing) {
        return borrowing.status === "borrowed";
      });

      const overdue = borrowed.filter(function (borrowing) {
        return borrowing.dueDate < todayDate;
      });

      setBorrowedBooks(borrowed.length);
      setOverdueBooks(overdue.length);
      const latestBorrowings = data
  .slice()
  .sort(function (a, b) {
    return new Date(b.borrowDate) - new Date(a.borrowDate);
  })
  .slice(0, 5);

setRecentBorrowings(latestBorrowings);

    });
}, []);


  return (
    <div> <h1 className="text-3xl font-extrabold p-6 text-slate-900 mb-6 border-l-4 border-yellow-500 pl-4">LIBRARY MANAGEMENT SYSTEM</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
 
 <div className="bg-white transition duration-300 hover:shadow-lg p-6 shadow-md rounded-2xl flex flex-col justify-between ">
  <h2 className="text-sm font-semibold text-slate-500">
    <i className="fas fa-book mr-3 text-green-500"></i>
    Total Books
  </h2>

  <p className="text-3xl font-bold text-slate-900 mt-3">
    {totalBooks}
  </p>
</div>
<div className="bg-white p-6 transition duration-300 hover:shadow-lg rounded-xl shadow-md ">
  <h2 className="text-sm font-semibold text-slate-500">
    <i className="fas fa-users mr-3 text-green-500"></i>
    Total Members
  </h2>

  <p className="text-3xl font-bold text-slate-900 mt-3">
    {totalMembers}
  </p>
</div>
<div className="bg-white  hover:shadow-lg transition duration-300 p-6 rounded-xl shadow-md">
  <h2 className="text-sm font-semibold text-slate-500">
   <i className="fas fa-book-open text-green-500 mr-3"></i>
    Borrowed Books
  </h2>

  <p className="text-3xl font-bold text-slate-900 mt-3">
    {borrowedBooks}
  </p>
</div>
<div className="bg-white hover:shadow-lg transition duration-300 p-6 rounded-xl shadow-md">
  <h2 className="text-sm font-semibold text-slate-500">
    <i className="fas fa-clock mr-3 text-green-500"></i>    
    Overdue Books
  </h2>

  <p className="text-3xl font-bold text-slate-900 mt-3">
  {overdueBooks}
  </p>
</div>
</div>
<div className="bg-white p-6 rounded-xl shadow-md mx-6">

  <h2 className="text-xl font-bold mb-4">
    Recent Borrowings
  </h2>

  <table className="w-full text-left">
    <thead>
      <tr>
        <th>Book Title</th>
        <th>Member</th>
        <th>Borrow Date</th>
        <th>Due Date</th>
        <th>Status</th>
      </tr>
    </thead>

    <tbody>
      {recentBorrowings.map(function (borrowing) {

 const book = books.find(function (book) {
    return String(book.id) === String(borrowing.bookId);
});
 const member = members.find(function (member) {
    return String(member.id) === String(borrowing.memberId);
});

const currentDate = new Date();

const today = currentDate.getFullYear() + "-" +
  String(currentDate.getMonth() + 1).padStart(2, "0") + "-" +
  String(currentDate.getDate()).padStart(2, "0");

const isOverdue =
  borrowing.status === "borrowed" &&
  borrowing.dueDate < today;

 return (
  <tr key={borrowing.id} className="border-b hover:bg-slate-50">

    <td className="p-3">
      {book ? book.title : "Book not found"}
    </td>

    <td className="p-3">
      {member ? member.name : "Member not found"}
    </td>

    <td className="p-3">
      {borrowing.borrowDate}
    </td>

    <td className="p-3">
      {borrowing.dueDate}
    </td>

    <td className="p-3">
  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
  isOverdue
    ? "bg-red-100 text-red-700"
    : borrowing.status === "borrowed"
      ? "bg-blue-100 text-blue-700"
      : "bg-green-100 text-green-700"
}`}>
  {isOverdue ? "Overdue" : borrowing.status}
</span>
</td>

  </tr>
);

})}
    </tbody>
</table>
    </div>
    </div>
 
);
}

export default Dashboard;