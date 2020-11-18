const express = require('express');

const project = require('../constants/project');
const gut = require('./gut/gut.routes');
const user = require('./users/user.routes');
const user_physical = require('./user_physical/user_physical.routes');
const user_playstyle = require('./user_playstyle/user_playstyle.routes');
const auth = require('./auth/auth.routes');
const racket_company = require('./racket_company/racket_company.routes');
const racket_version = require('./racket_version/racket_version.routes');
const racket_model = require('./racket_model/racket_model.routes');
const section_1 = require('./section_1/section_1.routes');
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
router.use('/gut', gut);
router.use('/user_physical', user_physical);
router.use('/user_playstyle', user_playstyle);
router.use('/user', user);
router.use('/auth', auth);
router.use('/racket_company', racket_company);
router.use('/racket_version', racket_version);
router.use('/racket_model', racket_model);
router.use('/section_1', section_1);
//  router.use('/gut_company', gut_company);
//  router.use('/gut_company', gut_company);

module.exports = router;