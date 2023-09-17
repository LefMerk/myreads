import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "../utils/BooksAPI";
import Book from "./Book";

export default function Search({ updateBookLists }) {

  const [query, setQuery] = useState("");
  const [booksFound, setBooksFound] = useState([]);
  const [mappedBooks, setMappedBooks] = useState([]);
  const [searchedBooks, setSearchedBooks] = useState([]);
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    const allBooks = async () => {
      const response = await BooksAPI.getAll();
      setMappedBooks(mapBooks(response));
    };

    allBooks();
  }, [])

  useEffect(() => {   
    if (query !== "") {
      const books = async () => {
        const response = await BooksAPI.search(query);
        if (response.error) {
          setBooksFound([]);
          setNoResults(true);
        }
        else {
          setBooksFound(response);
          setNoResults(false);
        }
        //console.log(response);
      }

      books();
    }
    else {
      setBooksFound([]);
    }  

  }, [query]);

  useEffect(() => {
    const matchBooks = booksFound.map(book => {
      if (mappedBooks.has(book.id)) {
        return mappedBooks.get(book.id);
      }
      else {
        return book;
      }
    });

    setSearchedBooks(matchBooks);
  }, [booksFound]);

  const mapBooks = (books) => {
    const map = new Map();
    books.map(book => map.set(book.id, book));
    return map;
  };

  const categorizeBook = (book, type) => {
    let newListing = false;
    if (!mappedBooks.has(book.id)) {
      newListing = true;
    }
    updateBookLists(book, type, newListing);
  };

  return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title, author, or ISBN"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {!noResults
              ? (searchedBooks.map(book => 
                  <li key={book.id}>
                    <Book book={book} moveTo={categorizeBook}  />
                  </li>)
                )
              : (<p>No results!</p>) 
            }
          </ol>
        </div>
      </div>
  );
}