import React, { useState } from "react";
import AddBookForm from "../components/AddBookForm";
import BookList from "../components/BookList";

export function Home() {
  const [activeSection, setActiveSection] = useState("home");

  return (
    <main className="flex-grow bg-bg text-text py-8  flex-col w-full">
      {/* 🔘 Navigation Buttons */}
      <div className="flex justify-center gap-2">
        <button
          onClick={() => setActiveSection("home")}
          className={`px-4 py-2 rounded ${
            activeSection === "home"
              ? "bg-primary text-white"
              : "bg-white dark:bg-gray-800 text-primary"
          }`}
        >
          Home
        </button>

        <button
          onClick={() => setActiveSection("addBook")}
          className={`px-4 py-2 rounded ${
            activeSection === "addBook"
              ? "bg-primary text-white"
              : "bg-white dark:bg-gray-800 text-primary"
          }`}
        >
          Add Book
        </button>

        <button
          onClick={() => setActiveSection("BookList")}
          className={`px-4 py-2 rounded ${
            activeSection === "BookList"
              ? "bg-primary text-white"
              : "bg-white dark:bg-gray-800 text-primary"
          }`}
        >
          View Books
        </button>
      </div>

      {/* 📄 Conditional Rendering of Sections */}
      <div className="max-w-6xl mx-auto px-6 space-y-6 mt-8">
        {activeSection === "home" && (
          <section className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mt-20   text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              Welcome to Book Management System 📚
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              Manage your books easily, add new ones, and view your collection.
            </p>
          </section>
        )}

        {activeSection === "addBook" && (
          <section className=" dark:bg-gray-800 rounded-lg ">
            <AddBookForm  onNavigateHome={() => setActiveSection("BookList")} />
          </section>
        )}

        {activeSection === "BookList" && (
          <section className=" dark:bg-gray-800 rounded-lg ">
            <BookList />
          </section>
        )}
      </div>
    </main>
  );
}

export default Home;
