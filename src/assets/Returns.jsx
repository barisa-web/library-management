
import React, { useState, useEffect } from 'react'

function Returns() {

  const [returns, setReturns] = useState([]);
  const [books, setBooks] = useState([]);
  const [members, setMembers] = useState([]);
  useEffect(function () {
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
  <div className="p-6">
    <h1 className="text-3xl font-extrabold text-slate-900 mb-6 border-l-4 border-yellow-500 pl-4">
      Returned Books
    </h1>
    <div className="bg-white rounded-xl shadow-md overflow-x-auto">
      <table className="w-full text-left">
        <thead className="bg-slate-900 text-white">
          <tr>
            <th className="p-4">#</th>
            <th className="p-4">Book Title</th>
            <th className="p-4">Member Name</th>
            <th className="p-4">Return Date</th>
            <th className="p-4">Fine (Ksh)</th>
            <th className="p-4">Status</th>
          </tr>
        </thead>
        <tbody>
          {returns.length === 0 ? (
            <tr>
              <td colSpan="6" className="p-6 text-center text-gray-500">
                No returned books available.
              </td>
            </tr>
          ) : (
            returns.map(function (item, index) {
              const book = books.find(function (book) {
                return book.id == item.bookId;
              });
              const member = members.find(function (member) {
                return member.id == item.memberId;
              });
              return (
                <tr key={item.id} className="border-b hover:bg-slate-50">
                  <td className="p-4">{index + 1}</td>
                  <td className="p-4">
                    {book ? book.title : "Unknown Book"}
                  </td>
                  <td className="p-4">
                    {member ? member.name : "Unknown Member"}
                  </td>
                  <td className="p-4">{item.returnDate}</td>
                  <td className="p-4">
    <span className={`font-bold ${
        Number(item.fine || 0) > 0
        ? "text-red-600"
        : "text-green-600"
    }`}>
        KSh {Number(item.fine || 0).toLocaleString()}
    </span>
</td>
                  <td className="p-4">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">
                      Returned
                    </span>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  </div>
);
}

export default Returns;
