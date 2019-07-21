# Installation

## Prereqs

- installation of postgres w/ default postgres database
- yarn
- node 12+

## Setting up the environment

1. `yarn install` to install node dependencies
2. `./bin/create-db.sh` to set up the initial database / schema / user in postgres
3. `yarn migrate:up` to update the database schema
4. `yarn codegen` to make TS definitions for server/client from GQL schema
5. `yarn build` or `yarn watch` to transpile the server/client TS
6. `yarn start` to start up the server

## Using the app

Navigate to <http://localhost:3000/static/index.html> to use the app. You can view the GQL explorer at <http://localhost:3000/app/graphql>.

## Features

### Fully implemented

1. Account creation
2. Login/logout
3. Browse items for sale
4. Add items to your cart
5. See a summary of the cart
6. App state persisted through refreshes

### Backend only

1. Create an order for a user
2. View all orders for a user

### Not yet implemented

1. Edit previous orders
2. View orders (front-end)
3. View cart
