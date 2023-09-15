export default function Book ({title, authors, img}) {

    return(
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage: `url("${img}")`,
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
          <div className="book-title">{title}</div>
          {authors.map((author, index) =>
            <div key={index} className="book-authors">{author}</div>
          )}
        </div>
    );
}