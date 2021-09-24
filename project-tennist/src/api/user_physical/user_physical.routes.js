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

router.get('/physical', authMiddlewares.isLoggedIn, async (req, res, next) => {
  const { id } = req.user;
  try {
    await getUserPhysicalValidSchema.validate({ id }, { abortEarly: false });
    // if (req.user.id != parseInt(id, 10)) {
    //   const err = await apiError('E3200');
    //   res.status(403);
    //   throw err;
    // }
    const physical = await UserPhysical.query()
      .select('weight_kg', 'height_cm', 'handed')
      .where('id', id)
      .where('t_user_id', req.user.id)
      .where('deleted_at', null);
    res.json({
      result: {
        status: 200,
        message: 'send data..',
        data: physical,
      },
    });
  } catch (error) {
    if (error.errorCode == undefined) {
      error = await apiError('E3018');
    }
    next(error);
  }
});

router.post('/physical', authMiddlewares.isLoggedIn, async (req, res, next) => {
  req.body.weight_kg = parseInt(req.body.weight_kg, 10);
  req.body.height_cm = parseInt(req.body.height_cm, 10);
  const { weight_kg, height_cm, handed } = req.body;
  const { id } = req.user;
  try {
    const physicalData = {
      weight_kg,
      height_cm,
      handed,
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
      .patch(physicalData)
      .where('t_user_id', id);

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
});

module.exports = router;
