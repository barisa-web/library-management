import React ,{useState, useEffect}from 'react'

function Borrowedbooks() {
    const[borrowedBooks,setBorrowedBooks]=useState([])
     const [books, setBooks] = useState([]);
    const [members, setMembers] = useState([]);
    useEffect(function () {
    fetch("http://localhost:3000/borrowings")
      .then(response => response.json())
        .then(data => setBorrowedBooks(data))
        fetch("http://localhost:3000/books")
    .then(response => response.json())
    .then(data => setBooks(data));
    fetch("http://localhost:3000/members")
    .then(response => response.json())
    .then(data => setMembers(data));
  }, []);
  function handleReturn(borrowedBookId) {
    const borrowing = borrowedBooks.find(function(item) {
    return item.id === borrowedBookId;
    
});
if (!borrowing) return;
if (borrowing.status !== "borrowed") return;
const book = books.find(function(item) {
    return item.id === borrowing.bookId;
});
 if (!book) return;
 const returnDate = new Date().toISOString().split("T")[0];
 fetch("http://localhost:3000/returns", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        borrowingId: borrowing.id,
        bookId: borrowing.bookId,
        memberId: borrowing.memberId,
        returnDate: returnDate
    })
})
.then(function(response) {
    if (!response.ok) {
        throw new Error("Could not save return record");
    }

    return response.json();
})
.then(function(data) {
    return fetch(`http://localhost:3000/books/${book.id}`, {
    method: "PATCH",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        copies: book.copies + 1
    })
});
})
   
.then(function(response) {
    if (!response.ok) {
        throw new Error("Could not update book copies");
    }

    return fetch(`http://localhost:3000/borrowings/${borrowedBookId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            status: "returned"
        })
    });
}) 
       .then(function(response) {
    if (!response.ok) {
        throw new Error("Could not update borrowing status");
    }

    return response.json();
})
        .then(updatedBorrowedBook => {
      setBorrowedBooks(prevBorrowedBooks =>
        prevBorrowedBooks.map(borrowedBook =>
          borrowedBook.id === updatedBorrowedBook.id ? updatedBorrowedBook : borrowedBook
        )
      );
      setBooks(function(previousBooks) {
    return previousBooks.map(function(item) {
        return item.id === book.id
            ? { ...item, copies: item.copies + 1 }
            : item;
    });
    
});

    })
    .catch(function(error) {
    console.error("Return failed:", error);
});
    
  }
  return (
    <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Borrowed Books</h1>
       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {borrowedBooks.map(function(borrowedbook) {
            const today = new Date();
const dueDate = new Date(borrowedbook.dueDate);
const isOverdue = dueDate < today && borrowedbook.status === "borrowed";
            const book = books.find(function(item) {
    return item.id === borrowedbook.bookId;
});

const member = members.find(function(item) {
    return item.id === borrowedbook.memberId;
});
            return (
                <div  className="bg-white p-5 rounded-xl shadow-md" key={borrowedbook.id}>
                   <h2>{book ? book.title : "Book not found"}</h2>
                    <p>Borrower: {member ? member.name : "Member not found"}</p>
                    <p>Borrow Date: {borrowedbook.borrowDate}</p>
                    <p>Due Date: {borrowedbook.dueDate}</p>
                    <p>Status: {borrowedbook.status}</p>
                    {borrowedbook.status === "borrowed" && (
                    <button
                        onClick={() => handleReturn(borrowedbook.id)}
                        className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
                    >
                        Mark as Returned
                    </button>
                    )}
                    <br />
                    <br />
                    <p className={isOverdue ? "text-red-600 font-bold" : "text-green-600 font-bold"}>
                    {isOverdue ? "Overdue" : "Not overdue"}
</p>
                </div>
            );
        })}
        </div>
    </div>
  )
}


export default Borrowedbooks