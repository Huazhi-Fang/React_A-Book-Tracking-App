import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BookShelfChanger from './BookShelfChanger.js';

class BookShelf extends Component {
  
  static propTypes = {
    books: PropTypes.array.isRequired,
    shelf: PropTypes.string.isRequired,
    changeShelf: PropTypes.func.isRequired
  }
  
  render() {
    const {books, shelf, changeShelf} = this.props;
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">
          {shelf === 'currentlyReading' ? 'Currently Reading' 
           : shelf === 'wantToRead' ? 'Want To Read' 
           : 'Read'}
        </h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.filter((book) => (book.shelf === shelf)).map((book) => (
              <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    <div className="book-cover" 
                      style={{width:128, height:193, backgroundImage:`url(${book.imageLinks && book.imageLinks.thumbnail})`}}
                    ></div>
                    <BookShelfChanger book={book} changeShelf={changeShelf} />
                  </div>
                  <div className="book-title">{book.title}</div>
                  <div className="book-authors">{book.authors && book.authors.map((author)=>(<div key={author}>{author}</div>))}</div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default BookShelf;