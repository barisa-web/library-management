import React, { useEffect, useState } from 'react'

function Crude() {
  const [books, setBooks] = useState([])
const [title, setTitle] = useState("")
const [author, setAuthor] = useState("")
const [category, setCategory] = useState("")
const [isbn, setIsbn] = useState("")
const [year, setYear] = useState("")
const [copies, setCopies] = useState("")
    const [editingId, setEditingId] = useState(null)
    const isFormInvalid = !title || !author || !category || !isbn || !year || !copies
    const[search, setSearch]=useState("")
    const [selectedCategory, setSelectedCategory] = useState("all")
    const [sortOrder, setSortOrder] = useState("asc")
    
    useEffect(function(){
        fetch("http://localhost:3000/books")
        .then(function(res){
            return res.json()
        })
        .then(function(data){
            setBooks(data)
        })
    },[])

   function handleChange(e) {
    let value = e.target.value

    if (e.target.name === "title") {
        setTitle(value)
    }

    if (e.target.name === "author") {
        setAuthor(value)
    }

    if (e.target.name === "category") {
        setCategory(value)
    }

    if (e.target.name === "isbn") {
        setIsbn(value)
    }

    if (e.target.name === "year") {
        setYear(value)
    }

    if (e.target.name === "copies") {
        setCopies(value)
    }
}
function handleSubmit(e){
        e.preventDefault()
        const newBook={
            title:title,
            author:author,
            category:category,
            isbn:isbn,
            year:year,
            copies:copies
        }
        if(editingId === null) {
     fetch("http://localhost:3000/books",{
       method:"POST",
       headers:{
        "Content-type":"application/json"
       },
       body:JSON.stringify(newBook)

     })
     .then(function(res) {
    return res.json()
})
.then(function(data) {
    setBooks([...books,data])
     setTitle("")
    setAuthor("")
    setCategory("")
    setIsbn("")
    setYear("")
    setCopies("")
})
    
 } else{
    fetch(`http://localhost:3000/books/${editingId}`,{
        method:"PUT",
        headers:{
            "Content-type":"application/json"
        },
        body:JSON.stringify(newBook)
    })
    .then(function(res){
        return res.json()
    })
    .then(function(data) {

            setBooks(books.map(function(book) {
                if (book.id === editingId) {
                    return data
                } else {
                    return book
                }
                
    }))
             setTitle("")
            setAuthor("")
            setCategory("")
            setIsbn("")
            setYear("")
            setCopies("")
            setEditingId(null)
})
 }
}
const filteredBooks = books.filter(function(book) {
    return (
        (selectedCategory === "all" || book.category === selectedCategory) &&
        (
            book.title.toLowerCase().includes(search.toLowerCase()) ||
            book.author.toLowerCase().includes(search.toLowerCase()) ||
            book.isbn.toLowerCase().includes(search.toLowerCase())
        )
    )
})
  const sortedBooks = filteredBooks.slice().sort(function(a, b) {
   if (sortOrder === "asc") {
    return a.title.localeCompare(b.title    )
} else {
    return b.title.localeCompare(a.title)
}
})
function handleDelete(id){
    fetch(`http://localhost:3000/books/${id}`,{
        method:"DELETE"
    })
    .then(function(data){
        setBooks(books.filter(function(book){
            return book.id !== id
        }))
    })
}

  return (
   <div >
 <h2 className="text-3xl font-extrabold text-slate-900 mb-6 border-l-4 border-yellow-500 pl-4">LIBRARY MANAGEMENT SYSTEM</h2>
 <section className="min-h-screen bg-slate-100 p-6 max-w-5xl mx-auto  font-bold text-center bg-white rounded-xl shadow-md">
    <h1 className='text-3xl'>Book List</h1>
    <input
    type="text"
    placeholder="Search books..."
    value={search}
    onChange={function(e) {
        setSearch(e.target.value)
    }}
/>
<select
    value={selectedCategory}
    onChange={function(e) {
        setSelectedCategory(e.target.value)
    }}
>
    <option value="all">All Categories</option>
    <option value="Programming">Programming</option>
    <option value="Science">Science</option>
    <option value="History">History</option>
    <option value="Education">Education</option>
    <option value="Fiction">Fiction</option>
</select>
<select
    value={sortOrder}
    onChange={function(e) {
        setSortOrder(e.target.value)
    }}
>
    <option value="asc">Name: A–Z</option>
    <option value="desc">Name: Z–A</option>
</select>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
   {sortedBooks.map(function(book){
    return(
       <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-yellow-500" >
        <div  key={book.id} >
        <h1 >TITLE:{book.title}</h1>
        
        <p>Author:{book.author}</p>
        <p>Category:{book.category}</p>
        <p>ISBN:{book.isbn}</p>
        <p>Publication Year:{book.year}</p>
        <p>Copies:{book.copies}</p>
        <div className="flex justify-center gap-2">     
         <button  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300" onClick={function(){
            
         setEditingId(book.id)
         setTitle(book.title)
         setAuthor(book.author)
         setCategory(book.category)
        setIsbn(book.isbn)
        setYear(book.year)
        setCopies(book.copies)
        
}}>
    
    Edit
</button>
 <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300" onClick={function(){
    handleDelete(book.id)
    
}}>
    Delete
</button>
</div>
        </div>
        
       </div>
    )
   })}
   </div>
    <p>Manage your books here.</p>
    {sortedBooks.length===0 &&(
    <p>No books found. Add your first book.</p>  
    )}
     <form onSubmit={handleSubmit} className="space-y-5">

                <div>
                    <label className="block font-medium mb-2">
                       
                        {editingId?" Editing Book":" Adding Book"}
                    </label>
                    <input
                        type="text"
                        name="title"
                        placeholder="Enter book title"
                        className="w-full border border-gray-300 rounded-lg p-3"
                        value={title}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label className="block font-medium mb-2">
                        Author
                    </label>
                    <input
                        type="text"
                        name="author"
                        placeholder="Enter book author"
                        className="w-full border border-gray-300 rounded-lg p-3"
                      value={author}
                      onChange={handleChange}
                    />
                </div>

                <div>
                    <label className="block font-medium mb-2">
                        Category
                    </label>
                    <input
                        type="text"
                        name="category"
                        placeholder="Enter book category"
                        className="w-full border border-gray-300 rounded-lg p-3"
                    value={category} onChange={handleChange}
                    />
                </div>
<div>
    <label>ISBN</label>
    <input
        type="text"
        name="isbn"
        placeholder="Enter ISBN"
         className="w-full border border-gray-300 rounded-lg p-3"
        value={isbn}
        onChange={handleChange}
    />
</div>

<div>
    <label>Publication Year</label>
    <input
        type="number"
        name="year"
        placeholder="Enter publication year"
        value={year}
         className="w-full border border-gray-300 rounded-lg p-3"
        onChange={handleChange}
    />
</div>

<div>
    <label>Number of Copies</label>
    <input
        type="number"
        name="copies"
        placeholder="Enter number of copies"
        value={copies}
         className="w-full border border-gray-300 rounded-lg p-3"
        onChange={handleChange}
    />
</div>



                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white rounded-lg p-3 hover:bg-blue-700"
                disabled={isFormInvalid}
               >
                     {editingId === null ? "Add Book" : "Update Book"}
                   
                </button>

            </form>
 
 
 </section>
   </div>
  )
}

export default Crude