import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "../utils/BooksAPI";
import Book from "./Book";

export default function Search({ saveBook, changed }) {

  const [query, setQuery] = useState("");
  const [booksFound, setBooksFound] = useState([]);
  const [noResults, setNoResults] = useState(false);

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
        console.log(response);
      }
      changed(booksFound);
      books();
    }
    else {
      setBooksFound([]);
    }
    
  }, [query]);

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
              ? (booksFound.map(book => 
                  <li key={book.id}>
                    <Book book={book} moveTo={saveBook} />
                  </li>)
                )
              : (<p>No results!</p>) 
            }
          </ol>
        </div>
      </div>
  );
}