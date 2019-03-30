import {gql} from 'apollo-boost'; // need this to construct queries

const getBooksQuery = gql`
  {
    books{
      name
      id
    }
  }
`

const getAuthorsQuery = gql`
  {
    authors{
      name
      id
    }
  }
`

const getBookQuery = gql`
  query($id: ID) {
    book(id: $id) {
      id
      name
      genre
      author{
        name
        age
        id
        books {
          name
          id
        }
      }
    }
  }
`

const addBookMutation = gql`
  mutation($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      name
      id
    }
  }
`

export {getAuthorsQuery, getBooksQuery, addBookMutation, getBookQuery}