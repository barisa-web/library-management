
import React, { useState, useEffect } from 'react'

function Books() {
    const [books, setBooks] = useState([]);
    const [editingBookId, setEditingBookId] = useState(null);
    const[title,setTitle]=useState("")
    const[author,setAuthor]=useState("")
    const[category,setCategory]=useState("")
    const[isbn,setIsbn]=useState("")
    const [newTitle, setNewTitle] = useState("");
const [newAuthor, setNewAuthor] = useState("");
const [newCategory, setNewCategory] = useState("");
const [newIsbn, setNewIsbn] = useState("");
const [newYear, setNewYear] = useState("");
const [newCopies, setNewCopies] = useState("");
const [newImage, setNewImage] = useState("");
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
    function handleEdit(book) {
        setEditingBookId(book.id);
        setTitle(book.title);
        setAuthor(book.author);
        setCategory(book.category);
        setIsbn(book.isbn);
    }
    function handleUpdate(e) {
        e.preventDefault();
        const existingBook = books.find(function(book) {
    return book.id === editingBookId;
});
       const updatedBook = {
    ...existingBook,
    title: title,
    author: author,
    category: category,
    isbn: isbn
};
        fetch(`http://localhost:3000/books/${editingBookId}`, {
    method: "PUT",
    headers: {
        "Content-Type": "application/json"
    },
   body: JSON.stringify(updatedBook)
})
.then(response => {
    if (response.ok) {
        setBooks(function(prevBooks) {
            return prevBooks.map(function(book) {
                if (book.id === editingBookId) {
                    return updatedBook;
                } else {
                    return book;
                }
            });
        });
        setEditingBookId(null);
        setTitle("");
        setAuthor("");
        setCategory("");
        setIsbn("");
    }
})
.catch(error => {
    console.error("Error updating book:", error);
});
    }
    function handleAddBook(e) {
    e.preventDefault();

    const newBook = {
        title: newTitle,
        author: newAuthor,
        category: newCategory,
        isbn: newIsbn,
        year: Number(newYear),
        copies: Number(newCopies),
        image: newImage
    };

    fetch("http://localhost:3000/books", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newBook)
    })
    .then(response => response.json())
    .then(data => {
        setBooks(function(previousBooks) {
            return [...previousBooks, data];
        });

        setNewTitle("");
        setNewAuthor("");
        setNewCategory("");
        setNewIsbn("");
        setNewYear("");
        setNewCopies("");
        setNewImage("");

        alert("Book added successfully!");
    });
}
  return (
    <div>
        <h1>Books available</h1>
        <h1 className="text-3xl font-bold p-6 text-slate-900">BOOK MANAGEMENT</h1>
        <div className="bg-white p-6 rounded-xl shadow-md mb-8">

    <h2 className="text-xl font-bold mb-5">
        Add New Book
    </h2>

    <form onSubmit={handleAddBook}>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <input
                type="text"
                placeholder="Book Title"
                value={newTitle}
                onChange={function(e) {
                    setNewTitle(e.target.value);
                }}
                className="border p-3 rounded-lg"
                required
            />

            <input
                type="text"
                placeholder="Author"
                value={newAuthor}
                onChange={function(e) {
                    setNewAuthor(e.target.value);
                }}
                className="border p-3 rounded-lg"
                required
            />

            <input
                type="text"
                placeholder="Category"
                value={newCategory}
                onChange={function(e) {
                    setNewCategory(e.target.value);
                }}
                className="border p-3 rounded-lg"
                required
            />

            <input
                type="text"
                placeholder="ISBN"
                value={newIsbn}
                onChange={function(e) {
                    setNewIsbn(e.target.value);
                }}
                className="border p-3 rounded-lg"
                required
            />

            <input
                type="number"
                placeholder="Published Year"
                value={newYear}
                onChange={function(e) {
                    setNewYear(e.target.value);
                }}
                className="border p-3 rounded-lg"
                required
            />

            <input
                type="number"
                placeholder="Available Copies"
                min="0"
                value={newCopies}
                onChange={function(e) {
                    setNewCopies(e.target.value);
                }}
                className="border p-3 rounded-lg"
                required
            />
            <input
                type="text"
                placeholder="Image path e.g. /images/fall.jpg"
                value={newImage}
                onChange={function(e) {
                    setNewImage(e.target.value);
                }}
                className="border p-3 rounded-lg md:col-span-2"
            />

        </div>

        <button
            type="submit"
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold px-6 py-3 rounded-lg mt-5"
        >
            Add Book
        </button>

    </form>
</div>
       {editingBookId !==null &&(
       <form  onSubmit={handleUpdate} className="bg-white rounded-lg shadow-xl text-sm text-gray-500 border border-gray-200 p-8 py-12 w-80 sm:w-[352px]">
    <div className="mt-4">
        <label className="block">Title</label>
        <input type="text" 
        placeholder="type here" required
        value={title}
        onChange={(e)=>setTitle(e.target.value)}
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500"/>
    </div>

    <div className="mt-4">
        <label className="block">Author</label>
        <input type="text" 
        placeholder="type here" required
        value={author}
        onChange={(e)=>setAuthor(e.target.value)}
           className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500"/>
    </div>

   <div className="mt-4">
        <label className="block">Category</label>
        <input type="text" 
        placeholder="type here" required
        value={category}
        onChange={(e)=>setCategory(e.target.value)}
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500"/>
    </div>
 <div className="mt-4">
        <label className="block">ISBN</label>
        <input type="text" placeholder="type here" required
        value={isbn}
        onChange={(e)=>setIsbn(e.target.value)}
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500"/>
    </div>
    <button type="submit" className="bg-indigo-500 hover:bg-indigo-600 transition-all text-white w-full py-2 rounded-md mt-4 cursor-pointer">
        Edit
    </button>
</form>
)}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
            {books.map(function (book) {
                return (
                    <div key={book.id} className="bg-white p-5 rounded-xl shadow-sm hover:shadow-lg transition duration-300 border border-slate-200">
                      <img
                        src={book.image}
                        alt={book.title}
                        className="w-full h-56 object-contain rounded-lg mb-4"
                          />
                        <h2 className="text-xl font-semibold mb-2">{book.title}</h2>
                        <p className="text-gray-700">Author: {book.author}</p>
                        <p className="text-gray-700">Category: {book.category}</p>
                        <p className="text-gray-700">Published Year: {book.year}</p>
                        <p>ISBN: {book.isbn}</p>
                        <p>Available Copies: {book.copies}</p>
                    <div className="flex gap-3 mt-4">
                         <button onClick={() => handleEdit(book)} className="bg-blue-600 text-white px-4 py-2 rounded-lg">
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