const express = require('express');

const project = require('../constants/project');
const gut_company = require('./gut_company/gut_company.routes');
const users = require('./users/users.routes');
const auth = require('./auth/auth.routes');
// const gut_company = require('./gut_company/gut_company.routes');

const router = express.Router();
router.get('/', (req, res) => {
  res.json({
    message: project.message,
  });
});
router.use('/gut_company', gut_company);
router.use('/users', users);
router.use('/auth', auth);
//  router.use('/gut_company', gut_company);

module.exports = router;
