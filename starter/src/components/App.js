import "../css/App.css";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import BookList from "./BookList";
import Search from "./Search";
import * as BooksAPI from "../utils/BooksAPI";

export default function App() {
  const [books, setBooks] = useState([]);
  const [changedSearch, setChangedSearch] = useState([]);

  const updateSearch = (changed) => {
    setChangedSearch(changed);
  };

  useEffect(() => {
    const allBooks = async () => {
      const response = await BooksAPI.getAll();
      setBooks(response);
    };

    allBooks();
  }, [changedSearch]);

  const bookAction = (book, type) => {
    const updatedLists = books.map(b => {
      if (b.id === book.id) {
        book.shelf = type;
        return book;
      }
      return b;
    })

    setBooks(updatedLists);

    BooksAPI.update(book, type);

  };

  return (
    <div className="app">
      <Routes>
        <Route exact path="/" element={<BookList books={books} moveBook={bookAction} />} />
        <Route exact path="/search" element={<Search saveBook={bookAction} changed={updateSearch} />} />
      </Routes>
    </div>
  );
}