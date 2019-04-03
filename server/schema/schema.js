const graphql = require('graphql');
const _ = require('lodash');
const reqTracker = require ('../orpheus/trackResolver');
const pool = require('../model/database');

const resolverCounter = {};

// 3 current responsibilities - define types, define relationship between types, and define route queries

// describe the object types in the schema; schema here defines the graph and the object types on the graph

// desctructure Graph QL Object Type - grab this function from the graphql package, so we can store and use it inside this file
const { 
  GraphQLObjectType, 
  GraphQLString, 
  GraphQLSchema, 
  GraphQLID, 
  GraphQLBoolean,
  GraphQLScalarType,
  GraphQLInt, 
  GraphQLList,
  GraphQLNonNull 
} = graphql;

const SpacecraftType = new GraphQLObjectType( {
  name: 'spacecraft',
  fields: () => ({
    _id: {type: GraphQLID},
    name: {type: GraphQLString},
    launch_date: {type: GraphQLScalarType},
    country: {
      type: CountryType,
      resolve(parent, args) {
        reqTracker.addEntry('country');
        return pool
        .query('SELECT * FROM country WHERE _id = $1;')
        .then(data => data);
      }
    },
    agency: {
      type: AgencyType,
      resolve(parent, args) {
        reqTracker.addEntry('agency');
        return pool
        .query('SELECT * FROM agency WHERE _id = $1;')
        .then(data => data);
      }
    },
    planet:  {
      type: PlanetType,
      resolve(parent, args) {
        reqTracker.addEntry('planet');
        return pool
        .query('SELECT * FROM planet WHERE _id = $1;')
        .then(data => data);
      }
    },
    mission_type: {type: GraphQLString},
    success: {type: GraphQLBoolean},
    engine: {
      type: EngineType,
      resolve(parent, args) {
        reqTracker.addEntry('spacecraft');
        // return _.find(authors, {id: parent.authorId});
        return pool
        .query('SELECT * FROM engine WHERE _id = $1;')
        .then(data => data);
      }
    }
  })
});

const AgencyType = new GraphQLObjectType( {
  name: 'agency',
  fields: () => ({
    _id: {type: GraphQLID},
    name: {type: GraphQLString},
    country: {
      type: CountryType,
      resolve(parent, args) {
        reqTracker.addEntry('country');
        // return _.filter(books, {authorId: parent.id});
        return pool
        .query('SELECT * FROM country WHERE _id = $1;');
      }
    }
  })
});

const CountryType = new GraphQLObjectType( {
  name: 'country',
  fields: () => ({
    _id: {type: GraphQLID},
    name: {type: GraphQLString}
  })
});

const PlanetType = new GraphQLObjectType( {
  name: 'country',
  fields: () => ({
    _id: {type: GraphQLID},
    name: {type: GraphQLString},
    type: {type: GraphQLString}
  })
});

const EngineType = new GraphQLObjectType( {
  name: 'country',
  fields: () => ({
    _id: {type: GraphQLID},
    name: {type: GraphQLString}
  })
});

// how we describe how a user can initially jump into the graph and grab data
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    // don't need to wrap in a function because we don't need to worry about the order
    spacecraft: {
      type: SpacecraftType,
      args: {_id: {type: GraphQLID}},
      resolve(parent, args) {
        reqTracker.addEntry('spacecraft');
        return pool
        .query('SELECT * FROM spacecraft WHERE _id = $1;');
      }
    },
    agency: {
      type: AgencyType,
      args: {_id: {type: GraphQLID}},
      resolve(parent, args) {
        reqTracker.addEntry('agency');
        return pool
        .query('SELECT * FROM agency WHERE _id = $1;');
      }
    },
    country: {
      type: CountryType,
      args: {_id: {type: GraphQLID}},
      resolve(parent, args) {
        reqTracker.addEntry('country');
        return pool
        .query('SELECT * FROM country WHERE _id = $1;');
      }
    },
    planet: {
      type: PlanetType,
      args: {_id: {type: GraphQLID}},
      resolve(parent, args) {
        reqTracker.addEntry('planet');
        return pool
        .query('SELECT * FROM planet WHERE _id = $1;');
      }
    },
    engine: {
      type: EngineType,
      args: {_id: {type: GraphQLID}},
      resolve(parent, args) {
        reqTracker.addEntry('engine');
        return pool
        .query('SELECT * FROM engine WHERE _id = $1;');
      }
    }
  }
});

// Mutations are what allows us to make mutate/change/update the data. In graphql we need to explicitly define our mutations; to say what data can be changed, added, deleted, etc.

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addSpacecraft: {
      type: SpacecraftType,
      // args: {
      //   name: {type: new GraphQLNonNull(GraphQLString)},
      //   age: {type: new GraphQLNonNull(GraphQLInt)}
      // },
      // resolve(parent, args){
      //   let author = new Author({
      //     name: args.name,
      //     age: args.age
      //   });
      //   return author.save();
      // }
    },
    addAgency: {
      type: AgencyType,
      // args: {
      //   name: {type: new GraphQLNonNull(GraphQLString)},
      //   genre: {type: new GraphQLNonNull(GraphQLString)},
      //   authorId: {type: new GraphQLNonNull(GraphQLID)}
      // },
      // resolve(parent, args){
      //   let book = new Book({
      //     name: args.name,
      //     genre: args.genre,
      //     authorId: args.authorId
      //   });
      //   return book.save();
      // }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
})

module.exports.resolverCounter = resolverCounter;