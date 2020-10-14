# product service

The product service provides a really simplified product query API that can be used to retrieve mock products for the live coding sample case.

## Setting the applications port
You can define the applications port by setting the environment variable

```
PORT=8080
```

If not defined the default port is **8080**.

## How to run
You can start the application in production mode using following command.

```
npm start
```

## How to develop
You can start the application in development mode using following command.

```
npm run dev:start
```
The service is then executed using _nodemon_ allowing it to be automatically restarted whenever source files are changed.
Nodemon starts the service with NODE_ENV='development' to enable development mode.

## API documentation
After starting the application you'll find its openAPI definition via HTTP Rest request to
```
http://localhost:8081/docs
```
