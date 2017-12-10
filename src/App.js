import React from "react";
import { Link, Route } from "react-router-dom";
// import * as BooksAPI from './BooksAPI'
import "./App.css";
import BookShelf from "./BookShelf";
import SearchBooks from "./SearchBooks";

class BooksApp extends React.Component {
  state = {
    books: []
  };

  moveBook(book) {
    return shelf => {
      this.setState(
        state => ({
          ...state,
          books:
            shelf === "none"
              ? state.books.filter(b => b !== book)
              : [...state.books.filter(b => b !== book), { ...book, shelf }]
        }),
        this.saveState
      );
    };
  }

  getBooksInShelf(shelf) {
    return this.state.books.filter(b => b.shelf === shelf);
  }

  getAllBookshelfs() {
    return [...new Set(this.state.books.map(b => b.shelf))];
  }

  getAllBooks() {
    return this.state.books;
  }

  componentDidMount() {
    if (localStorage.getItem("books")) {
      const books = JSON.parse(localStorage.getItem("books"));
      this.setState(state => ({ ...state, books: books }));
    }
  }

  saveState() {
    localStorage.setItem("books", JSON.stringify(this.state.books));
  }

  render() {
    return (
      <div className="app">
        <Route
          path="/search"
          render={() => (
            <SearchBooks
              moveBook={this.moveBook.bind(this)}
              getAllBooks={this.getAllBooks.bind(this)}
            />
          )}
        />
        <Route
          exact
          path="/"
          render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  <BookShelf
                    title="Currently Reading"
                    getBooks={() => this.getBooksInShelf("currentlyReading")}
                    getAllBookshelfs={this.getAllBookshelfs.bind(this)}
                    moveBook={this.moveBook.bind(this)}
                  />
                  <BookShelf
                    title="Want to Read"
                    getBooks={() => this.getBooksInShelf("wantToRead")}
                    getAllBookshelfs={this.getAllBookshelfs.bind(this)}
                    moveBook={this.moveBook.bind(this)}
                  />
                  <BookShelf
                    title="Read"
                    getBooks={() => this.getBooksInShelf("read")}
                    getAllBookshelfs={this.getAllBookshelfs.bind(this)}
                    moveBook={this.moveBook.bind(this)}
                  />
                </div>
              </div>
              <div className="open-search">
                <Link to="/search">Add a book</Link>
              </div>
            </div>
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
