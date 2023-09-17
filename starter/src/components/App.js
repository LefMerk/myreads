import "../css/App.css";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import BookList from "./BookList";
import Search from "./Search";
import * as BooksAPI from "../utils/BooksAPI";
import Loader from "./Loader";

export default function App() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const allBooks = async () => {
      const response = await BooksAPI.getAll();
      setBooks(response);
      setIsLoading(false);
    };

    allBooks();
  }, []);

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

  const updateBookLists = (book, type) => {
    book.shelf = type;
    books.push(book);
  };

  return (
    <div className="app">
      <Routes>
        <Route exact path="/" element={<BookList books={books} moveBook={bookAction} />} />
        <Route exact path="/search" element={<Search updateBookLists={updateBookLists} />} />
      </Routes>
      {isLoading && <Loader />}
    </div>
  );
}