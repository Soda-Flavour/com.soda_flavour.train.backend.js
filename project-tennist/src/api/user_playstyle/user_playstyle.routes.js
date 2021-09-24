const express = require('express');
const yup = require('yup');
const apiError = require('../../lib/apiError');
const connection = require('../../db');

const queries = require('./user_playstyle.queries');

const authMiddlewares = require('../auth/auth.middlewares');
const {
  getPlayStyleValidSchema,
  updatePlayStyleValidSchema,
} = require('./user_playstyle.validSchema');
const { query } = require('../users/user.model');
const router = express.Router();
router.use(authMiddlewares.checkUserHasToken);

router.get('/playstyle', authMiddlewares.isLoggedIn, async (req, res, next) => {
  console.log('바바바바바');
  const { id } = req.user;
  console.log(id);
  try {
    await getPlayStyleValidSchema.validate({ id }, { abortEarly: false });
    // if (req.user.id != parseInt(id, 10)) {
    //   const err = await apiError('E3200');
    //   res.status(403);
    //   throw err;
    // }

    const physical = await queries.get(id);
    res.json({
      result: {
        status: 200,
        message: 'send data..',
        data: physical,
      },
    });
  } catch (error) {
    console.log(error);
    if (error.errorCode == undefined) {
      error = await apiError('E3219');
    }
    next(error);
  }
});

router.post(
  '/playstyle',
  authMiddlewares.isLoggedIn,
  async (req, res, next) => {
    req.body.ntrp = parseFloat(req.body.ntrp, 10);
    req.body.forehand = parseInt(req.body.forehand, 10);
    req.body.backhand = parseInt(req.body.backhand, 10);
    req.body.play_style = parseInt(req.body.play_style, 10);

    const {
      ntrp,
      play_style: t_play_style_id,
      forehand: t_forehand_style_id,
      backhand: t_backhand_style_id,
    } = req.body;

    const { id } = req.user;
    try {
      const playStyleData = {
        ntrp,
        t_play_style_id,
        t_forehand_style_id,
        t_backhand_style_id,
      };
      const _playStyleData = await updatePlayStyleValidSchema
        .validate(playStyleData, { abortEarly: true })
        .catch(async (err) => {
          console.log(err);
          const _err = await apiError(err.params.label);
          res.status(403);
          throw _err;
        });

      const playStyleUpdated = await queries.update(_playStyleData, id);

      res.json({
        result: {
          status: 200,
          message: '신체정보를 업데이트 했습니다.',
          data: null,
        },
      });
    } catch (error) {
      console.log(error);
      if (error.errorCode == undefined) {
        error = await apiError('E3019');
      }
      next(error);
    }
  }
);

router.post(
  '/playstyle',
  authMiddlewares.isLoggedIn,
  async (req, res, next) => {
    const {
      weight_kg,
      height_cm,
      handed,
      t_play_style_id,
      t_forehand_style_id,
      t_backhand_style_id,
      age,
      sex,
    } = req.body;
    console.log('asdfasdf');

    try {
      const physicalData = {
        weight_kg,
        height_cm,
        handed,
        t_play_style_id,
        t_forehand_style_id,
        t_backhand_style_id,
        age,
        sex,
      };
      const _physicalData = await updatePhysicalValidSchema
        .validate(physicalData, { abortEarly: true })
        .catch(async (err) => {
          console.log(err);
          const _err = await apiError(err.params.label);
          res.status(403);
          throw _err;
        });
      console.log(physicalData);

      const physicalUpdated = await UserPhysical.query()
        .findById(parseInt(req.user.id, 10))
        .patch(physicalData);
      console.log(physicalUpdated);

      // const userPhysical = await UserPhysical.query().update()

      res.json({
        result: { state: 'succeed', messag: 'succeed!!', data: null },
      });
      // const user = await User.query.udate(req.body);
    } catch (error) {
      console.log(error);
      if (error.errorCode == undefined) {
        error = await apiError('E3019');
      }
      next(error);
    }
  }
);

module.exports = router;
