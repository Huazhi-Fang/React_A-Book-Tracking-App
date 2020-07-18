import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as BooksAPI from './BooksAPI';
import BookShelfChanger from './BookShelfChanger';

class SearchBooks extends Component {
  
  static propTypes = {
    books: PropTypes.array.isRequired,
    changeShelf: PropTypes.func.isRequired
  }
  
  state = {
    booksFound: []
  }

  searchBooks = (event) => {
    const query = event.target.value;
    BooksAPI.search(query, 20)
      .then((books) => {
        this.setState(() => ({
          booksFound: books
        }))    
      })
      .catch(() => {
        this.setState(() => ({
          booksFound: []
        }))  
      })
  }
  
  render() {
    // Let the books found by search have the same shelf property with those on the main listing page.
    // Set shelf = 'none' if the books have not yet been assigned a shelf.
    const booksFound = this.state.booksFound;
    const booksArchived = this.props.books;
    booksFound.forEach((book1, index1) => {
      book1.shelf = 'none';
      booksArchived.forEach((book2) => {
        if (book1.id === book2.id) {return booksFound[index1].shelf = book2.shelf}
      }) 
    })

    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/' className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input type="text" placeholder="Search by title or author" onChange={this.searchBooks} />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {booksFound.map((book) => (
              <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    <div className="book-cover" 
                      style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks && book.imageLinks.thumbnail})` }}
                    ></div>
                    <BookShelfChanger book={book} changeShelf={this.props.changeShelf} />
                  </div>
                  <div className="book-title">{book.title}</div>
                    <div className="book-authors">{book.authors && book.authors.map(author=>(<div key={author}>{author}</div>))}</div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks;