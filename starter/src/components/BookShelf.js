import Book from "./Book";

export default function BookShelf ({title, books}) {

    return(
        <div className="bookshelf">
          <h2 className="bookshelf-title">{title}</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
                {books.length !== 0 ? books.map((book, index) => 
                    <Book key={index} title={book.title} authors={book.authors} img={book.img} />
                )
                : <p>Empty</p>}
            </ol>
          </div>
        </div>
    );
}