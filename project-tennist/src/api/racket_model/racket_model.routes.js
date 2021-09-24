const express = require('express');
const apiError = require('../../lib/apiError');
const queries = require('./racket_model.queries');
const authMiddlewares = require('../auth/auth.middlewares');

const {
  getRacketModelValidSchema,
  insertRacketModelValidSchema,
} = require('./racket_model.validSchema');
const router = express.Router();
router.use(authMiddlewares.checkUserHasToken);

router.get('/:racketCompanyId', async (req, res, next) => {
  const {
    racketCompanyId
  } = req.params;
  try {
    await getRacketModelValidSchema.validate({
      racketCompanyId
    }, {
      abortEarly: false
    });

    const racketModelList = await queries.getList(racketCompanyId);
    res.json({
      result: {
        status: 200,
        message: 'send data..',
        data: {
          list: racketModelList
        },
      },
    });
  } catch (error) {
    console.log(error);
    if (error.errorCode == undefined) {
      const _error = await apiError('E3500');
      next(_error);
    }
    next(error);
  }
});


// router.get('/:racketVersionId', async (req, res, next) => {
//   const {
//     racketVersionId
//   } = req.params;
//   try {
//     await getRacketModelValidSchema.validate({
//       racketVersionId
//     }, {
//       abortEarly: false
//     });

//     const racketModelList = await queries.getList(racketVersionId);
//     res.json({
//       result: {
//         status: 200,
//         message: 'send data..',
//         data: {
//           list: racketModelList
//         },
//       },
//     });
//   } catch (error) {
//     console.log(error);
//     if (error.errorCode == undefined) {
//       const _error = await apiError('E3500');
//       next(_error);
//     }
//     next(error);
//   }
// });



router.post(
  '/insert_user_racket',
  authMiddlewares.isLoggedIn,
  async (req, res, next) => {
    req.body.racket_id = parseInt(req.body.racket_id, 10);
    console.log('body', req.body);

    const {
      racket_id,
      racket_nickname
    } = req.body;
    const {
      id
    } = req.user;
    try {
      const insertData = {
        racket_id,
        id,
        racket_nickname,
      };
      console.log('insertData', insertData);
      const _insertData = await insertRacketModelValidSchema
        .validate(insertData, {
          abortEarly: true
        })
        .catch(async (err) => {
          console.log(err);
          const _err = await apiError(err.params.label);
          res.status(403);
          throw _err;
        });
      console.log('_insertData', _insertData);

      const existingRacketNickName = await queries.ckeckRacketNickName(
        _insertData
      );
      if (existingRacketNickName) {
        const err = await apiError('E3520');
        res.status(403);
        throw err;
      }

      await queries.insertRacket(_insertData);

      res.json({
        result: {
          status: 200,
          message: '나의 라켓에 추가했습니다.',
          data: null,
        },
      });
    } catch (error) {
      console.log(error);
      if (error.errorCode == undefined) {
        const _error = await apiError('E3510');
        next(_error);
      }
      next(error);
    }
  }
);

module.exports = router;