var GraphQL = require('graphql');
var GraphQLRelay = require('graphql-relay');
var db = require('./database');

var nodeDefinitions = GraphQLRelay.nodeDefinitions(function(globalId) {
  var idInfo = GraphQLRelay.fromGlobalId(globalId);
  if (idInfo.type == 'Account') {
    return db.getAccount(idInfo.id)
  } else if (idInfo.type == 'News') {
    return db.getNewsById(idInfo.id)
  }
  return null
});

var accountType = new GraphQL.GraphQLObjectType({
  name: 'Account',
  description: 'Account description',
  isTypeOf: function(obj) { return obj instanceof db.Account },
  fields: function() {
    return {
      id: GraphQLRelay.globalIdField('Account'),
      login: {
        type: GraphQL.GraphQLString,
        description: 'Login description'
      },
      password: {
        type: GraphQL.GraphQLString,
        description: 'Password description'
      },
      news: {
        type: GraphQLRelay.connectionDefinitions({name: 'News', nodeType: newsType}).connectionType,
        description: 'News description',
        args: GraphQLRelay.connectionArgs,
        resolve: function(account, args) {
          return GraphQLRelay.connectionFromArray(db.getAllNews(), args);
        }
      }
    }
  },
  interfaces: [nodeDefinitions.nodeInterface]
});

var newsType = new GraphQL.GraphQLObjectType({
  name: 'News',
  description: 'News description',
  isTypeOf: function(obj) { return obj instanceof db.News },
  fields: {
    id: GraphQLRelay.globalIdField('News'),
    name: {
      type: GraphQL.GraphQLString,
      description: 'Name description'
    },
    title: {
      type: GraphQL.GraphQLString,
      description: 'Title description'
    },
    content: {
      type: GraphQL.GraphQLString,
      description: 'Content description'
    },
    type: {
      type: GraphQL.GraphQLString,
      description: 'Type description'
    }
  },
  interfaces: [nodeDefinitions.nodeInterface]
});

module.exports = new GraphQL.GraphQLSchema({
  query: new GraphQL.GraphQLObjectType({
    name: 'Query',
    fields: {
      node: nodeDefinitions.nodeField,
      account: {
        type: accountType,
        resolve: function() {
          return db.getAnonymousAccount();
        }
      }
    }
  })
});
