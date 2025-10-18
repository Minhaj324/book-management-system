import React from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";


export function AddBookForm({ onNavigateHome }) {

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async(data) => {
    try {
      const response  = await fetch("http://localhost:5000/api/books/add" , {
      method:"POST",
      headers:{
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),

      });
      if (response.ok){
      toast.success(" 📚 Book added successfully! " , {duration:2500});
      reset();
      setTimeout(() => {
        if (onNavigateHome) onNavigateHome();
        }, 2200);
      }
      
      else{
                  toast.error("❌ Failed to add book. Try again!");

      }

    } catch (error) {
     console.error("error adding book" , error) 
         toast.error("⚠️ Server error!");

    }

 
   
  };

  return (
    <>
      <Toaster position="top-right" />

      <div className="max-w-3xl mx-auto px-6 w-full">
        <h2 className="text-2xl font-bold mb-2 text-center">Add New Book</h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="pl-4 p-2 pr-4 shadow space-y-2"
        >
          <div>
            <label className="block mb-1 font-medium">Book Title</label>
            <input
              type="text"
              placeholder="Enter book title"
              {...register("title", { required: "Title is required" })}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">Author</label>
            <input
              type="text"
              placeholder="Enter author name"
              {...register("author", { required: "Author is required" })}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.author && (
              <p className="text-red-500 text-sm mt-1">
                {errors.author.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">Category</label>
            <input
              type="text"
              placeholder="Enter genre"
              {...register("genre")}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Published Year</label>
            <input
              type="number"
              placeholder="Enter year"
              {...register("year", {
                required: "Year is required",
                min: { value: 1000, message: "Enter valid year" },
                max: {
                  value: new Date().getFullYear(),
                  message: "Enter valid year",
                },
              })}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.year && (
              <p className="text-red-500 text-sm mt-1">{errors.year.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 mt-4 bg-primary text-white font-bold rounded hover:bg-secondary transition-colors"
          >
            Add Book
          </button>
        </form>
      </div>
    </>
  );
}

export default AddBookForm;
