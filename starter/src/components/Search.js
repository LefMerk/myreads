import { useState } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "../utils/BooksAPI";

export default function Search() {

  const [query, setQuery] = useState("");
  const [booksFound, setBooksFound] = useState([]);

  const findBooks = (query) => {
    const books = async () => {
      const response = await BooksAPI.search(query, 10);
      setBooksFound(response);
      console.log(response);
    }

    books();
    setQuery(query);
  }

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
              onChange={(e) => findBooks(e.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {booksFound.map((book, index) => 
              <li key={index}>
                <div className="book">
                  <div className="book-top">
                    <div
                      className="book-cover"
                      style={{
                        width: 128,
                        height: 193,
                        backgroundImage: `url(${book.imageLinks.thumbnail})`,
                      }}
                    ></div>
                    <div className="book-shelf-changer">
                      <select>
                        <option value="none" disabled>
                          Move to...
                        </option>
                        <option value="currentlyReading">
                          Currently Reading
                        </option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                  </div>
                  <div className="book-title">{book.title}</div>
                  {book.authors.map(author =>
                    <div className="book-authors">{author}</div>
                  )}
                </div>
              </li>
            )}
          </ol>
        </div>
      </div>
  );
}