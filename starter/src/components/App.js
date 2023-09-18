import "../css/App.css";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import * as BooksAPI from "../utils/BooksAPI";
import BookList from "./BookList";
import Search from "./Search";
import Loader from "./Loader";
import NotFound from "./NotFound";

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

  const bookAction = (book, type, newListing=false) => {

    let duplicateFlag = false;

    const updatedLists = books.map(b => {
      if (b.id === book.id) {
        duplicateFlag = true;
        book.shelf = type;
        return book;
      }
      return b;
    })
    
    if (newListing && !duplicateFlag) {
      book.shelf = type;
      updatedLists.push(book);
    }
    
    setBooks(updatedLists);

    BooksAPI.update(book, type);
  };

  return (
    <div className="app">
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route exact path="/" element={<BookList books={books} moveBook={bookAction} />} />
        <Route exact path="/search" element={<Search updateBookLists={bookAction} />} />
      </Routes>
      {isLoading && <Loader />}
    </div>
  );
}