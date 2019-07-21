import { ApolloServer } from 'apollo-server-express';
import { Application } from 'express';
import { GraphQLSchema } from 'graphql';
import { ContextFunction } from 'apollo-server-core';

export function applyGQLMiddleware(
  app: Application,
  path: string,
  schema: GraphQLSchema,
  context: ContextFunction
): void {
  const as = new ApolloServer({
    schema,
    context,
  });
  as.applyMiddleware({ app, path });
}
