import { GQLMutationTypeResolver, GQLCreateUser } from '../graph-ql/schema.codegen';
import { ValidationError } from 'apollo-server-core';
import { createUser } from './sql';
import { validateUsername } from '../../shared/validation/validate-username';

export const Mutation: Pick<GQLMutationTypeResolver, 'createUser'> = {
  async createUser(parent, args, ctx): Promise<GQLCreateUser> {
    const db = await ctx.db;
    const validationResult = validateUsername(args.username);
    if (!validationResult.valid) {
      throw new ValidationError(validationResult.errors.join('\n'));
    }

    const userId = await createUser(db, args.username);
    return { id: String(userId) };
  },
};
