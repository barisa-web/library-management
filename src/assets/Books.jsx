
import React, { useState, useEffect } from 'react'

function Books() {
    const [books, setBooks] = useState([]);
    const [editingBookId, setEditingBookId] = useState(null);
    useEffect(function () {
        fetch("http://localhost:3000/books")
            .then(response => response.json())
            .then(data => {
                setBooks(data);
            });
    }, []);
    function handleDelete(bookId){
        fetch(`http://localhost:3000/books/${bookId}`, {
            method: "DELETE",
        })
        .then(response => {
            if (response.ok) {
                setBooks(prevBooks => prevBooks.filter(book => book.id !== bookId));
            } else {
                console.error("Failed to delete the book.");
            }
            
        })
        .catch(error => {
    console.error("Error deleting book:", error);
});
    }
  return (
    <div>
        <h1 className="text-3xl font-bold p-6 text-slate-900">BOOK MANAGEMENT</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
            {books.map(function (book) {
                return (
                    <div key={book.id} className="bg-white p-5 rounded-xl shadow-sm hover:shadow-lg transition duration-300 border border-slate-200">
                        <h2 className="text-xl font-semibold mb-2">{book.title}</h2>
                        <p className="text-gray-700">Author: {book.author}</p>
                        <p className="text-gray-700">Category: {book.category}</p>
                        <p className="text-gray-700">Published Year: {book.year}</p>
                        <p>ISBN: {book.isbn}</p>
                        <p>Available Copies: {book.copies}</p>
                    <div className="flex gap-3 mt-4">
                         <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                          Edit
                         </button>

                         <button className="bg-red-600 text-white px-4 py-2 rounded-lg" onClick={() => handleDelete(book.id)}>
                         Delete
    </button>
</div>


                    </div>
                );
            })}
        </div>
    </div>
  )
}

export default Books