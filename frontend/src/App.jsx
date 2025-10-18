import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import AddBookForm from "./components/AddBookForm";
import BookList from "./components/BookList";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-bg text-text items-center">
      <Header />
      <main className="flex-grow mt-20 w-full px-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-book" element={<AddBookForm />} />
          <Route path="/books" element={<BookList />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
