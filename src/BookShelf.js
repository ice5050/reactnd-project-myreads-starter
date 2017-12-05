import React from "react";
import Book from "./Book";

class BookShelf extends React.Component {
  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.getBooks().map(b => (
              <li key={b.title}>
                <Book moveBook={this.props.moveBook(b)} {...b} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default BookShelf;
