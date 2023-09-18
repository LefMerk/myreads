import { useState, useEffect, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { debounce } from "lodash";
import * as BooksAPI from "../utils/BooksAPI";
import Book from "./Book";
import Loader from "./Loader";

export default function Search({ updateBookLists }) {

  const [query, setQuery] = useState("");
  const [booksFound, setBooksFound] = useState([]);
  const [mappedBooks, setMappedBooks] = useState([]);
  const [searchedBooks, setSearchedBooks] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const allBooks = async () => {
      const response = await BooksAPI.getAll();
      setMappedBooks(mapBooks(response));
    };

    allBooks();
  }, [])

  const sendQuery = useCallback(async (query) => {
    if (query !== "") {
      setIsLoading(true);
      const response = await BooksAPI.search(query);
      if (response.error) {
        setBooksFound([]);
        setNoResults(true);
      }
      else {
        setBooksFound(response);
        setNoResults(false);
      }
      setIsLoading(false);
      //console.log(response);
    }
    else {
      setBooksFound([]);
      setIsLoading(false);
    }  

  }, []);

  const debouncedSearch = useMemo(() => {
    return debounce(sendQuery, 500);
  }, [sendQuery]);

  useEffect(() => {
    debouncedSearch(query);
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
  }, [booksFound, mappedBooks]);

  const mapBooks = (books) => {
    const map = new Map();
    books.map(book => map.set(book.id, book));
    return map;
  };

  const categorizeBook = (book, type) => {
    let newListing = !mappedBooks.has(book.id) ? true : false;
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
        {isLoading && <Loader />}
      </div>
  );
}

Search.propTypes = {
  updateBookLists: PropTypes.func.isRequired,
};