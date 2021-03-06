import React from "react";
import { Link } from "react-router-dom";
import { search } from "./BooksAPI";
import Book from "./Book";

class SearchBooks extends React.Component {
  state = {
    books: [],
    query: ""
  };

  change(event) {
    this.setState({ query: event.target.value.trim() });
    if (this.state.query)
      search(this.state.query, 10)
        .then(books => {
          this.setState(state => ({
            ...state,
            books: books.map(
              b =>
                this.props
                  .getAllBooks()
                  .find(bookInShelf => bookInShelf.id === b.id) || {
                  shelf: "none",
                  id: b.id,
                  title: b.title,
                  author: b.authors && b.authors[0],
                  backgroundImage: b.imageLinks && b.imageLinks.thumbnail
                }
            )
          }));
        })
        .catch(err => {
          console.error(err);
        });
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={this.change.bind(this)}
              value={this.state.query}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.books.map(b => (
              <li key={b.id}>
                <Book moveBook={this.props.moveBook(b)} {...b} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchBooks;
