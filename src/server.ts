import bodyParser from 'body-parser';
import express from 'express';
import { initialize } from 'express-openapi';

import apiDoc from './apiDoc.json';

const app = express();

const isProductionEnvironment: boolean = process.env.NODE_ENV === 'production';
const port: number = process.env.PORT ? parseInt(process.env.PORT) : 8081;
const docsPath = '/docs';

app.use(bodyParser.json());

initialize({
  apiDoc,
  docsPath,
  app,
  paths: isProductionEnvironment ? './dist/apiPaths' : './src/apiPaths',
  routesGlob: '**/*.{ts,js}',
  routesIndexFileRegExp: /(?:index)?\.[tj]s$/,
  exposeApiDocs: true
});

app.use(((err, req, res, next) => {
  res.status(err.status).json(err);
}) as express.ErrorRequestHandler);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
  console.log(`See the api documentation here http://localhost:${port}${docsPath}`);
});
