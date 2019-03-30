import React, { Component } from 'react';
import {graphql} from 'react-apollo' // the package helps us bind apollo to react; glues it together

import {getBooksQuery} from '../queries/queries'; // retrieves the list of books

// components
import BookDetails from './BookDetails';


class BookList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null
    }
  };

  displayBooks() {
    var data = this.props.data
    
    if(data.loading) {
      return( <div>Loading Books...</div> );
    } else {
      return data.books.map(book => {
        return (
          <li key={book.id} onClick={ (e) => {this.setState({selected: book.id})}}>{book.name}</li>
        );
      })
    }
  };

  render() {
    return (
      <div>
        <ul id="book-list">
          {this.displayBooks()}
        </ul>
        <BookDetails bookId={this.state.selected}/>
      </div>
    );
  }
}

export default graphql(getBooksQuery)(BookList);