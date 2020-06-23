const express = require('express');
const morgan = require('morgan');
const compression = require('compression');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const middlewares = require('./middlewares');
const api = require('./api/api');
const project = require('./constants/project');

const app = express();
app.use(morgan('tiny'));
app.use(compression());
app.use(helmet());
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
api.use(
  rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 100,
  })
);

//TODO: body parser

app.get('/', (req, res) => {
  res.json({
    message: project.message,
  });
});

app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
