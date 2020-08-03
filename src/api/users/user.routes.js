const express = require('express');
const yup = require('yup');
const apiError = require('../../lib/apiError');
const User = require('./user.model');
const UserPhysical = require('../user_physical/user_physical.model');
const connection = require('../../db');
const authMiddlewares = require('../auth/auth.middlewares');
const { updateBasicInfoschema } = require('./user.validSchema');

const { orWhereNotExists } = require('../../db');
const router = express.Router();
router.use(authMiddlewares.checkUserHasToken);

const schema = yup.object().shape({
  id: yup.number().required(),
});

// router.get('/', async (req, res) => {
//   const users = await User.query()
//     .select('id', 'email', 'nick')
//     .where('deleted_at', null);
//   res.json(users);
// });

router.get('/:id', authMiddlewares.isLoggedIn, async (req, res, next) => {
  const { id } = req.params;
  try {
    await schema.validate({ id }, { abortEarly: false });
    if (req.user.id != id) throw new Error('허용되지 않은 요청입니다.');
    const users = await User.query()
      .select('id', 'email', 'nick')
      .where('id', id)
      .where('deleted_at', null);
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/mypage/:id',
  authMiddlewares.isLoggedIn,
  async (req, res, next) => {
    const { id } = req.params;
    try {
      await schema.validate({ id }, { abortEarly: false });
      if (req.user.id != id) throw new Error('허용되지 않은 요청입니다.');

      // const users = await User.getMyPage(id);

      let data = await connection
        .select(
          'tu.nick',
          'tup.weight_kg',
          'tup.height_cm',
          'tup.handed',
          'age',
          'sex',
          'ntrp',
          {
            play_style: 'tps.name_kor',
          }
        )
        .from({ tu: 't_user' })
        .innerJoin({ tup: 't_user_physical' }, 'tu.id', '=', 'tup.t_user_id')
        .leftJoin({ tps: 't_play_style' }, 'tup.t_play_style_id', '=', 'tps.id')
        .where('tu.id', id);
      res.json({
        result: { status: 200, message: 'succeed!!', data: data },
      });
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/basic_info/:id',
  authMiddlewares.isLoggedIn,
  async (req, res, next) => {
    const { id } = req.params;
    try {
      await schema.validate({ id }, { abortEarly: false });
      if (req.user.id != id) throw new Error('허용되지 않은 요청입니다.');

      // const users = await User.getMyPage(id);

      let data = await connection
        .select('tu.nick', 'age', 'sex')
        .from({ tu: 't_user' })
        .innerJoin({ tup: 't_user_physical' }, 'tu.id', '=', 'tup.t_user_id')
        .where('tu.id', id);
      res.json({
        result: { status: 200, message: 'succeed!!', data: data },
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/basic_info',
  authMiddlewares.isLoggedIn,
  async (req, res, next) => {
    const { nick, age, sex } = req.body;
    const trx = await User.startTransaction();
    try {
      const basicInfo = {
        nick,
        age,
        sex,
      };

      await updateBasicInfoschema
        .validate(basicInfo, { abortEarly: true })
        .catch(async (err) => {
          console.log(err);
          const _err = await apiError(err.params.label);
          res.status(403);
          throw _err;
        });
      const id = req.user.id;
      const existingNick = await User.query()
        .where({ nick })
        .where('id', '!=', id)
        .first();
      if (existingNick) {
        const err = await apiError('E3021');
        res.status(403);
        throw err;
      }

      const insertedUser = await User.query(trx).findById(id).patch({
        nick,
      });

      const updateUserPhysical = await UserPhysical.query(trx)
        .patch({
          age,
          sex,
        })
        .where('t_user_id', id);

      res.json({
        result: {
          status: 200,
          message: '기본정보를 업데이트 했습니다.',
          data: null,
        },
      });
      await trx.commit();
    } catch (error) {
      console.log(error);
      await trx.rollback();
      if (error.errorCode == undefined) {
        error = await apiError('E3000');
      }
      next(error);
    }
  }
);

router.post('/', async (req, res) => {
  console.log('전달받은 바디');
  console.lop(req.body);

  try {
    const user = await User.query.insert(req.body);
  } catch (error) {}
});

module.exports = router;
