import React from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';
import ListBooks from './ListBooks.js';
import SearchBooks from './SearchBooks.js';

class BooksApp extends React.Component {
  
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
          books
        }))
    })
  }

  changeShelf = (book, updatedShelf) => {
    const updatedBook = {...book, shelf: updatedShelf}
    
    // remove the to-be-updated book from the state object if it exists.
    const filteredBooks = this.state.books.filter((item) => (
      item.id !== updatedBook.id
    ))
    
    // persist the shelf update in backend server and add the updated book back into the state object.
    BooksAPI.update(book, updatedShelf)
      .then(() => {
        this.setState(() => ({
          books: filteredBooks.concat(updatedBook)
        }))
    })
  }

  render() {
    return (
      <div className="app">
       
        <Route exact path='/' render={() => (
          <ListBooks books={this.state.books} changeShelf={this.changeShelf} />
        )} />

        <Route path='/search' render={() => (
          <SearchBooks books={this.state.books} changeShelf={this.changeShelf} />
        )} />

      </div>
    )
  }
}

export default BooksApp
