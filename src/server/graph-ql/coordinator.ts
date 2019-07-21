import { Application, Request } from 'express';
import { applyGQLMiddleware } from './graph-ql';
import { GraphQLSchema } from 'graphql';
import { ContextFunction } from 'apollo-server-core';
import { makeExecutableSchema } from 'graphql-tools';
import { schema, GQLResolver } from './schema.codegen';
import { GQLContext } from './context';
import { Query as OrderQuery, Mutation as OrderMutation, Order } from '../order/resolver';
import { Query as ItemQuery, Mutation as ItemMutation } from '../item/resolver';
import { Mutation as UserMutation } from '../user/resolver';
import { Mutation as SessionMutation } from '../session/resolver';

export class GraphQLCoordinator {
  private readonly schema: GraphQLSchema;
  private readonly contextFn: ContextFunction<{ req: Request }, GQLContext>;

  constructor() {
    const resolvers: GQLResolver = {
      Query: {
        ...OrderQuery,
        ...ItemQuery,
      },
      Mutation: {
        ...ItemMutation,
        ...OrderMutation,
        ...UserMutation,
        ...SessionMutation,
      },
      Order,
    };
    this.schema = makeExecutableSchema({
      typeDefs: [schema],

      // TODO: come up with a reasonable way to mesh the codegen'd types with apollo-servers'
      // tslint:disable-next-line:no-any
      resolvers: resolvers as any,
    });
    this.contextFn = ({ req }) => ({ db: req.db });
  }

  /**
   * Calling this function will attach apollos gql middleware to `app` at `path`.
   *
   * Unfortunately, we can't expose a proper middleware function due to how apollo-server-express's
   * middleware applies itself (you pass in your app, as opposed to it providing a fn).
   *
   * @param path the url path to attach the GQL middleware
   * @param app the express application to attach middleware to
   */
  public applyMiddleware(path: string, app: Application) {
    applyGQLMiddleware(app, path, this.schema, this.contextFn);
  }
}
