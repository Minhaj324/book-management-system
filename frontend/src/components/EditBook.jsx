import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function EditBook({ book, onClose, onUpdate }) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      title: book.title,
      genre: book.genre,  // ✅ fix here
      author: book.author,
      year: book.year,
    }
  });

  // Reset form whenever book changes
  useEffect(() => {
    reset({
      title: book.title,
      genre: book.genre,
      author: book.author,
      year: book.year,
    });
  }, [book, reset]);

  const onSubmit = async (data) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/books/update/${book._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        const updatedBook = await response.json();
        toast.success("Book updated!");
        onUpdate(updatedBook.book); // Update state in BookList
        onClose();
      } else {
        toast.error("Failed to update book. Try again!");
      }
    } catch (error) {
      console.error("Error updating book:", error);
      toast.error("Server error!");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Edit Book</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          <div>
            <label className="block mb-1 font-medium">Title</label>
            <input
              type="text"
              {...register("title", { required: "Title is required" })}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
          </div>

          <div>
            <label className="block mb-1 font-medium">Genre</label>
            <input
              type="text"
              {...register("genre", { required: "Genre is required" })} // ✅ fix
              className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.genre && <p className="text-red-500 text-sm">{errors.genre.message}</p>}
          </div>

          <div>
            <label className="block mb-1 font-medium">Author</label>
            <input
              type="text"
              {...register("author", { required: "Author is required" })}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.author && <p className="text-red-500 text-sm">{errors.author.message}</p>}
          </div>

          <div>
            <label className="block mb-1 font-medium">Year</label>
            <input
              type="number"
              {...register("year", {
                required: "Year is required",
                min: { value: 1000, message: "Enter valid year" },
                max: { value: new Date().getFullYear(), message: "Year cannot be in future" },
              })}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.year && <p className="text-red-500 text-sm">{errors.year.message}</p>}
          </div>

          <div className="flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-primary text-white rounded hover:bg-secondary">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
