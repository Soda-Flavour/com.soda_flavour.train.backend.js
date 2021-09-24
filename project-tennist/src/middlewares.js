const { errorTypes } = require('./constants/errorTypes');

function notFound(req, res, next) {
  const error = new Error(`Not found - ${req.originalUrl}`);
  res.status(404);
  next(error);
}

function errorHandler(error, req, res, next) {
  const statusCode =
    res.statusCode === 200 ? errorTypes[error.name] || 500 : res.statusCode;
  res.status(statusCode);

  res.json({
    result: {
      status: statusCode,
      errorCode: error.errorCode,
      message: error.message,
      stack: process.env.NODE_ENV === 'production' ? 'Hi' : error.stack,
      error: error.errors || undefined,
    },
  });
}

module.exports = {
  notFound,
  errorHandler,
};
