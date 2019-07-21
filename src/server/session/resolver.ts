import { GQLMutationTypeResolver, GQLLogin } from '../graph-ql/schema.codegen';
import { createSession } from './sql';
import { getIdForUsername } from '../user/sql';

export const Mutation: Pick<GQLMutationTypeResolver, 'login'> = {
  async login(parent, args, ctx): Promise<GQLLogin> {
    const db = await ctx.db;
    const userId = await getIdForUsername(db, args.username);

    // TODO: passwords
    const token = await createSession(db, userId);
    return { token };
  },
};
