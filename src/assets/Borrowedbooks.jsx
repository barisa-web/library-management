
import React, { useState, useEffect } from 'react'

function Borrowedbooks() {

    const [borrowedBooks, setBorrowedBooks] = useState([]);
    const [books, setBooks] = useState([]);
    const [members, setMembers] = useState([]);
    const [settings, setSettings] = useState(null);

    const [selectedBook, setSelectedBook] = useState("");
    const [selectedMember, setSelectedMember] = useState("");
    const [isBorrowing, setIsBorrowing] = useState(false);
    const [borrowingsLoaded, setBorrowingsLoaded] = useState(false);

    // Fetch all required data
    useEffect(function () {

        fetch("http://localhost:3000/borrowings")
    .then(response => response.json())
    .then(data => {
        setBorrowedBooks(data);
        setBorrowingsLoaded(true);
    })

        fetch("http://localhost:3000/books")
            .then(response => response.json())
            .then(data => setBooks(data));

        fetch("http://localhost:3000/members")
            .then(response => response.json())
            .then(data => setMembers(data));

        fetch("http://localhost:3000/settings")
            .then(response => response.json())
            .then(data => setSettings(data[0]));

    }, []);

    // Get today's date in YYYY-MM-DD format
    function getTodayDate() {

        const today = new Date();

        return today.getFullYear() + "-" +
            String(today.getMonth() + 1).padStart(2, "0") + "-" +
            String(today.getDate()).padStart(2, "0");
    }

    // Calculate due date using borrowing duration from Settings
    function calculateDueDate(borrowDate, borrowingDays) {

        const dueDate = new Date(borrowDate + "T00:00:00");

        dueDate.setDate(
            dueDate.getDate() + Number(borrowingDays)
        );

        return dueDate.getFullYear() + "-" +
            String(dueDate.getMonth() + 1).padStart(2, "0") + "-" +
            String(dueDate.getDate()).padStart(2, "0");
    }

    // Borrow a book
    function handleBorrow(e) {

        e.preventDefault();
      if (!borrowingsLoaded) {
    alert("Please wait while borrowing records load.");
    return;
}
        if (!settings) {
            alert("Please wait. Settings are still loading.");
            return;
        }

        const book = books.find(function (item) {
            return item.id === selectedBook;
        });

        const member = members.find(function (item) {
            return item.id === selectedMember;
        });

        if (!book || !member) {
            alert("Please select a book and a member.");
            return;
        }

        // Check available book copies
        if (Number(book.copies) <= 0) {
            alert("Sorry, this book is out of stock.");
            return;
        }

        // Count books currently borrowed by this member
const activeBorrowings = borrowedBooks.filter(function (item) {
    return String(item.memberId) === String(selectedMember) &&
        item.status === "borrowed";
});

// Check maximum borrowing limit
if (activeBorrowings.length >= Number(settings.maxBooks)) {
    alert("Sorry! This member has reached the maximum number of books allowed.");
    return;
}

        const borrowDate = getTodayDate();

        const dueDate = calculateDueDate(
            borrowDate,
            settings.borrowingDays
        );

        const newBorrowing = {
            bookId: selectedBook,
            memberId: selectedMember,
            borrowDate: borrowDate,
            dueDate: dueDate,
            status: "borrowed"
        };

        setIsBorrowing(true);

        // Save borrowing record
        fetch("http://localhost:3000/borrowings", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newBorrowing)
        })
            .then(function (response) {

                if (!response.ok) {
                    throw new Error("Could not save borrowing record");
                }

                return response.json();
            })
            .then(function (data) {

                // Reduce available book copies
                return fetch(`http://localhost:3000/books/${book.id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        copies: Number(book.copies) - 1
                    })
                })
                    .then(function (response) {

                        if (!response.ok) {
                            throw new Error("Could not update book copies");
                        }

                        return data;
                    });
            })
            .then(function (data) {

                setBorrowedBooks(function (previous) {
                    return [...previous, data];
                });

                setBooks(function (previousBooks) {
                    return previousBooks.map(function (item) {
                        return item.id === book.id
                            ? { ...item, copies: Number(item.copies) - 1 }
                            : item;
                    });
                });

                setSelectedBook("");
                setSelectedMember("");

                alert("Book borrowed successfully!");

            })
            .catch(function (error) {

                console.error("Borrowing failed:", error);
                alert("Something went wrong while borrowing the book.");

            })
            .finally(function () {
                setIsBorrowing(false);
            });
    }

    // Return a borrowed book
    function handleReturn(borrowedBookId) {

        if (!settings) {
            alert("Please wait. Settings are still loading.");
            return;
        }

        const borrowing = borrowedBooks.find(function (item) {
            return item.id === borrowedBookId;
        });

        if (!borrowing || borrowing.status !== "borrowed") return;

        const book = books.find(function (item) {
            return item.id === borrowing.bookId;
        });

        if (!book) return;

        const returnDate = getTodayDate();

        const dueDate = new Date(borrowing.dueDate + "T00:00:00");
        const actualReturnDate = new Date(returnDate + "T00:00:00");

        const timeDifference = actualReturnDate - dueDate;

        const overdueDays = Math.max(
            0,
            Math.ceil(timeDifference / (1000 * 60 * 60 * 24))
        );

        const fine = overdueDays * Number(settings.finePerDay || 0);

        fetch("http://localhost:3000/returns", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                borrowingId: borrowing.id,
                bookId: borrowing.bookId,
                memberId: borrowing.memberId,
                returnDate: returnDate,
                fine: fine
            })
        })
            .then(function (response) {

                if (!response.ok) {
                    throw new Error("Could not save return record");
                }

                return response.json();
            })
            .then(function () {

                return fetch(`http://localhost:3000/books/${book.id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        copies: Number(book.copies) + 1
                    })
                });
            })
            .then(function (response) {

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
            .then(function (response) {

                if (!response.ok) {
                    throw new Error("Could not update borrowing status");
                }

                return response.json();
            })
            .then(function (updatedBorrowedBook) {

                setBorrowedBooks(function (previous) {
                    return previous.map(function (item) {
                        return item.id === updatedBorrowedBook.id
                            ? updatedBorrowedBook
                            : item;
                    });
                });

                setBooks(function (previousBooks) {
                    return previousBooks.map(function (item) {
                        return item.id === book.id
                            ? { ...item, copies: Number(item.copies) + 1 }
                            : item;
                    });
                });

                alert("Book returned successfully!");

            })
            .catch(function (error) {
                console.error("Return failed:", error);
            });
    }

    return (

        <div className="p-6 bg-slate-100 min-h-screen">

            <h1 className="text-3xl font-bold mb-6">
                Borrowed Books
            </h1>

            {/* Borrow Book Form */}

            <div className="bg-white p-6 rounded-xl shadow-md mb-8">

                <h2 className="text-xl font-bold mb-5">
                    Borrow a Book
                </h2>

                <form onSubmit={handleBorrow}>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                        <div>
                            <label className="block font-semibold mb-2">
                                Select Book
                            </label>

                            <select
                                value={selectedBook}
                                onChange={function (e) {
                                    setSelectedBook(e.target.value);
                                }}
                                className="w-full border border-slate-300 p-3 rounded-lg"
                                required
                            >
                                <option value="">Choose a book</option>

                                {books.map(function (book) {
                                    return (
                                        <option
                                            key={book.id}
                                            value={book.id}
                                            disabled={Number(book.copies) <= 0}
                                        >
                                            {book.title} ({book.copies} copies available)
                                        </option>
                                    );
                                })}

                            </select>
                        </div>

                        <div>
                            <label className="block font-semibold mb-2">
                                Select Member
                            </label>

                            <select
                                value={selectedMember}
                                onChange={function (e) {
                                    setSelectedMember(e.target.value);
                                }}
                                className="w-full border border-slate-300 p-3 rounded-lg"
                                required
                            >
                                <option value="">Choose a member</option>

                                {members.map(function (member) {
                                    return (
                                        <option
                                            key={member.id}
                                            value={member.id}
                                        >
                                            {member.name}
                                        </option>
                                    );
                                })}

                            </select>
                        </div>

                    </div>

                    <div className="mt-5 text-sm text-slate-600">
                        <p>
                            Maximum books per member: {settings ? settings.maxBooks : "..."}
                        </p>

                        <p>
                            Borrowing duration: {settings ? settings.borrowingDays : "..."} days
                        </p>

                    </div>

                    <button
                        type="submit"
                        disabled={isBorrowing || !settings || !borrowingsLoaded}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold px-6 py-3 rounded-lg mt-5 disabled:opacity-50"
                    >
                        {isBorrowing ? "Processing..." : "Borrow Book"}
                    </button>

                </form>

            </div>

            {/* Borrowed Books List */}

            <h2 className="text-xl font-bold mb-5">
                Borrowing Records
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {borrowedBooks.map(function (borrowedbook) {
                
                    const today = new Date(getTodayDate() + "T00:00:00");

                    const dueDate = new Date(borrowedbook.dueDate + "T00:00:00");

                    const isOverdue =
                        dueDate < today &&
                        borrowedbook.status === "borrowed";
                  const book = books.find(function (item) {
    return String(item.id) === String(borrowedbook.bookId);
});
                    const member = members.find(function (item) {
                        return item.id === borrowedbook.memberId;
                    });
                    return (
                        <div
                            className="bg-white p-5 rounded-xl shadow-md"
                            key={borrowedbook.id}
                        >
                            {book && book.image && (
                               <img
                                src={book.image}
                                 alt={book.title}
                                 className="w-full h-48 object-contain rounded-lg mb-4 bg-slate-100"
                                  />
                               )}


                            <h2 className="font-bold text-lg">
                                {book ? book.title : "Book not found"}
                            </h2>
                         
                            <p>
                                Borrower: {member ? member.name : "Member not found"}
                            </p>

                            <p>
                                Borrow Date: {borrowedbook.borrowDate}
                            </p>

                            <p>
                                Due Date: {borrowedbook.dueDate}
                            </p>

                            <p>
                                Status: {borrowedbook.status}
                            </p>

                            {borrowedbook.status === "borrowed" && (

                                <button
                                    onClick={function () {
                                        handleReturn(borrowedbook.id);
                                    }}
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mt-3"
                                >
                                    Mark as Returned
                                </button>

                            )}

                            <p className={
                                isOverdue
                                    ? "text-red-600 font-bold mt-3"
                                    : "text-green-600 font-bold mt-3"
                            }>
                                {isOverdue ? "Overdue" : "Not overdue"}
                            </p>

                        </div>

                    );

                })}

            </div>

        </div>
    );
}

export default Borrowedbooks
