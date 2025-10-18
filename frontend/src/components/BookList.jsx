import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import EditBook from "./EditBook";
import { Trash2, Edit } from "lucide-react";
import { ThreeDots } from "react-loader-spinner";

export function BookList() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingBook, setEditingBook] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch books from backend
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/books");
        const data = await response.json();
        // 2 second loader delay
        setTimeout(() => {
          setBooks(data);
          setLoading(false);
        }, 2000);
      } catch (error) {
        console.error("Error fetching books:", error);
        toast.error("⚠️ Server Error!");
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // ✅ Search filter
  const filteredBooks = books.filter((book) =>
    book.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id) => {
  try {
    const response = await fetch(`http://localhost:5000/api/books/delete/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      toast.success("Book deleted successfully!");
      // State update karo taki UI se bhi remove ho jaye
      setBooks(books.filter((b) => b._id !== id));
    } else {
      toast.error("Failed to delete book. Try again!");
    }
  } catch (error) {
    console.error("Error deleting book:", error);
    toast.error("Server error!");
  }
};


  // ✅ Edit handlers
  const handleEdit = (book) => {
    setEditingBook(book);
    setIsModalOpen(true);
  };

  const handleUpdate = (updatedBook) => {
    setBooks(books.map((b) => (b._id === updatedBook._id ? updatedBook : b)));
    setIsModalOpen(false);
  };

  return (
    <div className="flex  flex-col justify-center px-6    p-5 w-full">
      <Toaster position="top-right" />

      {/* 🔍 Search bar */}
      <div className="flex justify-end mb-6">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-64 p-2 border border-gray-300 rounded focus:outline-none dark:bg-gray-700 dark:text-white"
        />
      </div>

      {/* 🌀 Loader */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <ThreeDots
            height="50"
            width="50"
            radius="9"
            color="#4b3621"
            ariaLabel="three-dots-loading"
            visible={true}
          />
        </div>
      ) : (
        <>
          {/* 📚 Book Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {filteredBooks.map((book) => (
              <div
                key={book._id}
                className="flex flex-col p-4 rounded border shadow hover:shadow-lg bg-white dark:bg-gray-800"
              >
                <span className="text-sm font-medium mb-2">{book.genre}</span>
                <h3 className="font-bold text-lg">{book.title}</h3>
                <p className="text-sm mt-1">
                  <span className="font-semibold">Author: </span>
                  {book.author}
                </p>
                <p className="text-sm mt-1">
                  <span className="font-semibold">Genre: </span>
                  {book.genre}
                </p>
                <p className="text-sm mt-1">
                  <span className="font-semibold">Year:</span> {book.year}
                </p>

                <div className="flex justify-end gap-2 mt-2">
                  <button
                    onClick={() => handleEdit(book)}
                    className="text-blue-500 cursor-pointer hover:text-blue-700"
                  >
                    <Edit />
                  </button>
                  <button
                    onClick={() => handleDelete(book._id)}
                    className="text-red-500 hover:text-red-700 cursor-pointer"
                  >
                    <Trash2 />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* ✏️ Edit Modal */}
          {isModalOpen && editingBook && (
            <EditBook
              book={editingBook}
              onClose={() => setIsModalOpen(false)}
              onUpdate={handleUpdate}
            />
          )}
        </>
      )}
    </div>
  );
}

export default BookList;
