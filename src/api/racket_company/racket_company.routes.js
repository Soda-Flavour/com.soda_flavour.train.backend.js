const express = require('express');
const yup = require('yup');
const apiError = require('../../lib/apiError');

const RacketCompany = require('./racket_company.model');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const racketCompany = await RacketCompany.query().select(
      'id',
      'name',
      'name_kor'
    );

    res.json({
      result: {
        status: 200,
        message: 'This is list.',
        data: {
          list: racketCompany,
        },
      },
    });
  } catch (error) {
    if (error.errorCode == undefined) {
      error = await apiError('E3300');
    }
    next(error);
  }
});

module.exports = router;
