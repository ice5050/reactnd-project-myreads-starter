import React from "react";

class Book extends React.Component {
  change(event) {
    if (this.props.moveBook) this.props.moveBook(event.target.value);
  }

  render() {
    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: this.props.width || 128,
              height: this.props.height || 192,
              backgroundImage: `url("${this.props.backgroundImage}")`
            }}
          />
          <div className="book-shelf-changer">
            <select
              onChange={e => {
                this.change(e);
              }}
              value={this.props.shelf}
            >
              <option value="none" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{this.props.title}</div>
        <div className="book-authors">{this.props.authors}</div>
      </div>
    );
  }
}

export default Book;
