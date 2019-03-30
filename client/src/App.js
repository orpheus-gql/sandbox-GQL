import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo'; // this allows react to understand apollo

// components
import BookList from "./components/BookList";
import AddBook from './components/AddBook';

// apollo client setup

const  client = new ApolloClient({
  uri: 'http://localhost:3500/graphql'
})
// registered on the frontend here to say we're making requests to above endpoint from this application
// below we wrap our app in Apollo provider to enable us to get the data from above endpoint and inject it into whatever inside the Apollo provider

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
      <div id="main">
        <h1>Wisdom's Reading List</h1>
        <BookList/>
        <AddBook/>
      </div>
      </ApolloProvider>
    );
  }
}

export default App;
