const express = require('express');
const yup = require('yup');
const apiError = require('../../lib/apiError');

const UserPhysical = require('./user_physical.model');
const authMiddlewares = require('../auth/auth.middlewares');
const {
  getUserPhysicalValidSchema,
  updatePhysicalValidSchema,
} = require('./user_physical.validSchema');
const router = express.Router();
router.use(authMiddlewares.checkUserHasToken);

router.get('/:id', authMiddlewares.isLoggedIn, async (req, res, next) => {
  const { id } = req.params;
  try {
    await getUserPhysicalValidSchema.validate({ id }, { abortEarly: false });
    if (req.user.id != parseInt(id, 10)) {
      const err = await apiError('E3200');
      res.status(403);
      throw err;
    }
    const users = await UserPhysical.query()
      .select(
        'id',
        't_user_id',
        'weight_kg',
        'height_cm',
        'handed',
        'age',
        'sex'
      )
      .where('id', id)
      .where('t_user_id', req.user.id)
      .where('deleted_at', null);
    res.json(users);
  } catch (error) {
    if (error.errorCode == undefined) {
      error = await apiError('E3018');
    }
    next(error);
  }
});

router.post('/', authMiddlewares.isLoggedIn, async (req, res, next) => {
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

    res.json({ result: { state: 'succeed', messag: 'succeed!!', data: null } });
    // const user = await User.query.udate(req.body);
  } catch (error) {
    console.log(error);
    if (error.errorCode == undefined) {
      error = await apiError('E3019');
    }
    next(error);
  }
});

module.exports = router;
