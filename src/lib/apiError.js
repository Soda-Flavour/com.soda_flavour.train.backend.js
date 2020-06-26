const errorCodes = require('../constants/errorCodes');

function apiError(errCode) {
  const error = new Error();
  error.message = errorCodes[errCode].errorMessage;
  error.errorCode = errorCodes[errCode].errorCode;
  console.log(errorCodes[errCode]);
  // error.errorData = errorCodes[errCode];
  return error;
}

module.exports = apiError;
