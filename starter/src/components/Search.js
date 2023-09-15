import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "../utils/BooksAPI";
import Book from "./Book";

export default function Search() {

  const [query, setQuery] = useState("");
  const [booksFound, setBooksFound] = useState([]);

  useEffect(() => {
    const books = async () => {
      const response = await BooksAPI.search(query);
      setBooksFound(response);
      console.log(response);
    }

    books();

  }, [query]);

  const updateQuery = (q) => {
    setQuery(q);
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
              onChange={(e) => updateQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {booksFound && !booksFound.error
              ? (booksFound?.map((book, index) => 
                  <li key={index}>
                    <Book title={book?.title} authors={book?.authors} img={book?.imageLinks?.thumbnail} />
                  </li>)
                )
              : (<p>No results!</p>) 
            }
          </ol>
        </div>
      </div>
  );
}