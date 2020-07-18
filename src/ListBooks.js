import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import BookShelf from './BookShelf.js';

class ListBooks extends Component {
  
  static propTypes = {
    books: PropTypes.array.isRequired,
    changeShelf: PropTypes.func.isRequired
  }
  
  render() {
    const {books, changeShelf} = this.props;
    return (
      <div className="app">
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookShelf books={books} shelf='currentlyReading' changeShelf={changeShelf} />
                <BookShelf books={books} shelf='wantToRead' changeShelf={changeShelf} />
                <BookShelf books={books} shelf='read' changeShelf={changeShelf} />
              </div>
            </div>
            <div className="open-search">
              <Link to='/search'> Add a book </Link>
            </div>
          </div>
      </div>
    )
  }
}

export default ListBooks;