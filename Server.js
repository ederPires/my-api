const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

async function startServer() {
  const app = express();
  const PORT = 8081;

  const typeDefs = gql`
    type Query {
      hello: String
      user(id: ID!): User
      users: [User]
    }

    type User {
      id: ID!
      username: String!
      email: String!
    }
  `;

  const users = [
    { id: '1', username: 'user1', email: 'user1@example.com' },
    { id: '2', username: 'user2', email: 'user2@example.com' }
  ];

  const resolvers = {
    Query: {
      hello: () => 'Hello, world!',
      user: (_, { id }) => users.find(user => user.id === id),
      users: () => users
    },
  };

  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({ app });

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}${server.graphqlPath}`);
  });
}

startServer();
