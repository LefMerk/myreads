import PropTypes from 'prop-types';
import Book from "./Book";

export default function BookShelf ({ title, books, moveBook}) {

  return(
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
              {books?.length !== 0 
                ? books.map(book => 
                  <li key={book.id}>
                    <Book book={book} moveTo={moveBook} />
                  </li>)
                : <p>Empty list</p>
              }
          </ol>
        </div>
      </div>
  );
}

BookShelf.propTypes = {
  title: PropTypes.string.isRequired, 
  books: PropTypes.array.isRequired, 
  moveBook: PropTypes.func.isRequired,
};