const express = require('express');

const project = require('../constants/project');
const gut_company = require('./gut_company/gut_company.routes');
const user = require('./users/user.routes');
const user_physical = require('./user_physical/user_physical.routes');
const auth = require('./auth/auth.routes');
const racket_company = require('./racket_company/racket_company.routes');
const racket_version = require('./racket_version/racket_version.routes');
// const gut_company = require('./gut_company/gut_company.routes');
// const gut_company = require('./gut_company/gut_company.routes');
// const gut_company = require('./gut_company/gut_company.routes');
// const gut_company = require('./gut_company/gut_company.routes');
// const gut_company = require('./gut_company/gut_company.routes');

const router = express.Router();
router.get('/', (req, res) => {
  res.json({
    message: project.message,
  });
});
router.use('/gut_company', gut_company);
router.use('/user_physical', user_physical);
router.use('/user', user);
router.use('/auth', auth);
router.use('/racket_company', racket_company);
router.use('/racket_version', racket_version);
//  router.use('/gut_company', gut_company);
//  router.use('/gut_company', gut_company);
//  router.use('/gut_company', gut_company);

module.exports = router;
