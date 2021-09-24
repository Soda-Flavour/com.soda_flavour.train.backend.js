const jwt = require('jsonwebtoken');

function sign(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: '1h',
      },
      (error, token) => {
        if (error) return reject(error);
        return resolve(token);
      }
    );
  });
}

function refresh(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: '10h',
      },
      (error, token) => {
        if (error) return reject(error);
        return resolve(token);
      }
    );
  });
}

function verify(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
      if (error) return reject(error);
      return resolve(decoded);
    });
  });
}

module.exports = {
  sign,
  refresh,
  verify,
};
