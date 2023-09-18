import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import BookShelf from "./BookShelf";

export default function BookList({ books, moveBook }) {

  const currentlyReading = books.filter(book => book.shelf === "currentlyReading");
  const wantToRead = books.filter(book => book.shelf === "wantToRead");
  const read = books.filter(book => book.shelf === "read");

  const types = [
    {id: "currentlyReading", text: "Currently Reading"},
    {id: "wantToRead", text: "Want to Read"},
    {id: "read", text: "Read"},
  ];

  const stateMap = {
    currentlyReading,
    wantToRead,
    read,
  };

  return(
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {types.map(type => 
              <BookShelf key={type.id} title={type.text} books={stateMap[type.id]} moveBook={moveBook} />
            )}    
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
  );
}

BookList.propTypes = {
  books: PropTypes.array.isRequired, 
  moveBook: PropTypes.func.isRequired,
};