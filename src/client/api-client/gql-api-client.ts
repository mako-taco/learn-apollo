import { APIClient, AuthToken, APIResponsePromise } from './api-client';
import { ApolloClient, ExecutionResult } from 'apollo-boost';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from 'graphql-tag';
import { MutationCreateUserArgs, Mutation, Query, Item, QueryItemsArgs } from './schema.codegen';
import { authHeader } from '../../shared/constants/headers';

const createUserMutation = gql`
  mutation CreateUser($username: String!) {
    createUser(username: $username) {
      id
    }
  }
`;

const loginMutation = gql`
  mutation LoginUser($username: String!) {
    login(username: $username) {
      token
    }
  }
`;

const listItemsQuery = gql`
  query listItemsQuery($ids: [String!]) {
    items {
      id
      title
      description
      stock
      price
    }
  }
`;

export class GQLAPIClient implements APIClient {
  private readonly client: ApolloClient<{}>;

  constructor(token?: string) {
    const headers = token ? { [authHeader]: `Bearer ${token}` } : {};
    this.client = new ApolloClient({
      link: new HttpLink({
        uri: '/app/graphql',
        headers,
      }),
      cache: new InMemoryCache(),
    });
  }

  public async login(username: string): APIResponsePromise<AuthToken> {
    const gqlResult: ExecutionResult<Mutation> = await this.client.mutate({
      mutation: loginMutation,
      variables: { username },
    });

    if (gqlResult.errors) {
      return { errors: gqlResult.errors.map(e => e.message) };
    }

    if (gqlResult.data === undefined) {
      return { errors: ['No token returned'] };
    }

    return { result: gqlResult.data.login.token };
  }

  public async createUser(username: string): APIResponsePromise<string> {
    const gqlResult = await this.client.mutate<Mutation, MutationCreateUserArgs>({
      mutation: createUserMutation,
      variables: { username },
    });

    if (!gqlResult.data) {
      return gqlResult.errors
        ? { errors: gqlResult.errors.map(e => e.message) }
        : { errors: ['Failed to create token'] };
    }

    return { result: gqlResult.data.createUser.id };
  }

  public async items(ids?: string[]): APIResponsePromise<Item[]> {
    const gqlResult: ExecutionResult<Query> = await this.client.query<Query, QueryItemsArgs>({
      query: listItemsQuery,
      variables: ids ? { ids } : undefined,
    });

    if (!gqlResult.data) {
      return gqlResult.errors
        ? { errors: gqlResult.errors.map(e => e.message) }
        : { errors: ['Failed to get item list'] };
    }
    return { result: gqlResult.data.items };
  }
}
