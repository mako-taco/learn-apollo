//tslint:disable-next-line:no-import-side-effect
import * as sourcemaps from 'source-map-support';
import * as express from 'express';
import * as dotenv from 'dotenv';
import { PGExpress } from './pg-express/pg-express';
import { Pool } from 'pg';
import { GraphQLCoordinator } from './graph-ql/coordinator';
import { Authentication } from './session/authentication';
import { authHeader } from '../shared/constants/headers';

sourcemaps.install();
dotenv.config();

const app = express();
const port = 3000;

const pgPool = new Pool({
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
});
const pgExpress = new PGExpress(pgPool);
const graphQLPath = '/app/graphql';
const gqlCoordinator = new GraphQLCoordinator();
const authentication = new Authentication(authHeader);

app.use('/static', express.static('./dist/client'));
app.use('/app', pgExpress.middleware);
app.use('/app', authentication.middleware);
gqlCoordinator.applyMiddleware(graphQLPath, app);

app.listen(port, () => console.log(`GraphQL Explorer @ http://localhost:${port}${graphQLPath}`));
