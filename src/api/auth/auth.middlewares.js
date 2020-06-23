const jwt = require('../../lib/jwt');

async function checkUserHasToken(req, res, next) {
  console.log('토큰 검증');
  try {
    const authHeader = req.get('Authorization');
    if (!authHeader) throw new Error('Not exist auth header');

    const token = authHeader.split(' ')[1];
    if (!token) throw new Error('Not exist token value');

    const user = await jwt.verify(token);
    req.user = user;

    next();
  } catch (error) {
    console.log('Token check error');
    console.log(error);
    next();
  }
}

function isLoggedIn(req, res, next) {
  console.log('로그인 검증');
  if (req.user) {
    next();
  } else {
    unAuthorized(res, next);
  }
}

function unAuthorized(res, next) {
  const error = new Error('Un-Authorized');
  res.status(401);
  next(error);
}

module.exports = {
  checkUserHasToken,
  isLoggedIn,
};
