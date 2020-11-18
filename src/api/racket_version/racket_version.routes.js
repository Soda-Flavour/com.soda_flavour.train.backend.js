const express = require('express');
const yup = require('yup');
const apiError = require('../../lib/apiError');

const RacketVersion = require('./racket_version.model');
const { getRacketVersionValidSchema } = require('./racket_version.validSchema');
const router = express.Router();

router.get('/:racketCompanyId', async (req, res, next) => {
  const { racketCompanyId } = req.params;
  try {
    await getRacketVersionValidSchema.validate(
      { racketCompanyId },
      { abortEarly: false }
    );
    const racketVersion = await RacketVersion.query()
      .select('id', 'name', 'name_kor')
      .where({ t_racket_company_id: racketCompanyId });

    res.json({
      result: {
        status: 200,
        message: 'send data..',
        data: { list: racketVersion },
      },
    });
  } catch (error) {
    console.log(error);
    if (error.errorCode == undefined) {
      error = await apiError('E3400');
    }
    next(error);
  }
});

module.exports = router;
