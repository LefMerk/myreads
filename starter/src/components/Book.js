import PropTypes from 'prop-types';

export default function Book ({ book, moveTo }) {
    const shelves = [
      {id:"1", shelfName:"currentlyReading", shelfDisplayName:"Currently Reading"},
      {id:"2", shelfName:"wantToRead", shelfDisplayName:"Want to Read"},
      {id:"3", shelfName:"read", shelfDisplayName:"Read"},
      {id:"4", shelfName:"none", shelfDisplayName:"None"},
    ];

    return(
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage: `url("${book?.imageLinks?.thumbnail ? book.imageLinks.thumbnail : book?.imageLinks?.smallThumbnail}")`,
              }}
            ></div>
            <div className="book-shelf-changer">
              <select defaultValue={book.shelf ? book.shelf : "none"} onChange={(e) => moveTo(book, e.target.value)}>
                <option disabled>
                  Move to...
                </option>
                {shelves.map(shelf => 
                  <option key={shelf.id} value={shelf.shelfName}>{shelf.shelfDisplayName}</option>
                )}
              </select>
            </div>
          </div>
          <div className="book-title">{book?.title}</div>
          {book?.authors?.map((author, index) =>
            <div key={index} className="book-authors">{author}</div>
          )}
        </div>
    );
}

Book.propTypes = {
  book: PropTypes.object.isRequired, 
  moveTo: PropTypes.func.isRequired,
};