# Intro

Application for parsing reviews from the Delivery Club service.

**Technology stack:** NestJS, TypeScript, PostgreSQL, Swagger, Docker

# Preliminary requirements
* Install [Docker](https://www.docker.com/)
* Install [Node.JS](https://nestjs.com/)
* Install [Nest](https://nestjs.com/)

## Running development mode
1. Running an ```npm i``` command in the root directory to install all dependencies
2. To run the application on your database, put your data in the  ```.env.dev``` file in the root directory
3. Running an ```npm run start:dev``` command in the root directory to launch local dev server
4. Navigate to `http://localhost:3000/api/v1/docs` in a browser to see a docs

> The app will automatically reload if you change any of the source files.

## Running production mode
1. Create an PostgreSQL db and set up the the network and database access
2. Create an ```.env.prod``` file in the root directory and add the following in
````javascript
PORT=3000
DB_HOST=<Your db host>
DB_PORT=<Your db port>
DB_USER=<Your db username>
DB_PASSWORD=<Your db password>
DB_NAME=<Your db name>
FRONT_URL=<Your url frontend>
DEFAUL_CHAIN_ID=<ID company>

NODE_ENV=prod
````
1. Running a docker container ```make prod``` in the root directory

> In order to stop a docker contaienr in the root directory to run an ```make stop``` command

## Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```
