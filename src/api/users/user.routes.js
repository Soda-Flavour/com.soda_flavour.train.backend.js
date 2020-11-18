const express = require('express');
const yup = require('yup');
const queries = require('./user.queries');
const apiError = require('../../lib/apiError');
const User = require('./user.model');
const UserPhysical = require('../user_physical/user_physical.model');
const connection = require('../../db');
const authMiddlewares = require('../auth/auth.middlewares');


const fs = require('fs');
const Readable = require('stream').Readable;


const {
  updateBasicInfoschema
} = require('./user.validSchema');

const user_racket = require('./user_racket/user_racket.routes');
const user_racket_history = require('./user_racket_history/user_racket_history.routes');

const router = express.Router();
router.use('/racket', user_racket);
router.use('/racket_history', user_racket_history);

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




router.post('/mypage/upload_thumb', authMiddlewares.isLoggedIn, async (req, res, next) => {

  try {
    const {
      id
    } = req.user;
    const fileName = await Math.random().toString(36).substr(2, 11) + id + "_date_" + await Date.now() + '.png';
    const reqParams = {
      id,
      fileName
    }

    const imgBuffer = new Buffer.from(req.body.data, 'base64')
    var s = new Readable();
    s.push(imgBuffer)
    s.push(null)
    s.pipe(fs.createWriteStream(`./src/public/image/thumb/${fileName}`));

    const resultData = await queries.insertUserThumb(reqParams);

    res.json({
      result: {
        status: 200,
        message: 'send data..',
        data: {
          "thumb": fileName
        },
      },
    });

  } catch (error) {
    console.log(error);
    if (error.errorCode == undefined) {
      error = await apiError('E4500');
    }
    next(error);
  }

});



router.get('/mypage', authMiddlewares.isLoggedIn, async (req, res, next) => {
  const {
    id
  } = req.user;
  try {
    const reqParams = {
      id
    };

    const userRacketList = await queries.getMyPageData(reqParams);
    console.log(userRacketList);


    res.json({
      result: {
        status: 200,
        message: 'send data..',
        data: userRacketList,
      },
    });
  } catch (error) {
    console.log(error);
    if (error.errorCode == undefined) {
      error = await apiError('E3600');
    }
    next(error);
  }
});



// router.get('/mypage', authMiddlewares.isLoggedIn, async (req, res, next) => {
//   const {
//     id
//   } = req.user;
//   try {
//     await schema.validate({
//       id
//     }, {
//       abortEarly: false
//     });
//     if (req.user.id != id) throw new Error('허용되지 않은 요청입니다.');

// const resultData = awaut queries.getMyPage()

//     const users = await User.query()
//       .select('id', 'email', 'nick')
//       .where('id', id)
//       .where('deleted_at', null);

//     res.json({
//       result: {
//         status: 200,
//         message: 'send data..',
//         data: users,
//       },
//     });
//   } catch (error) {
//     next(error);
//   }
// });

// router.get('/mypage', authMiddlewares.isLoggedIn, async (req, res, next) => {
//   console.log(req.user);
//   const { id } = req.params;
//   try {
//     await schema.validate({ id }, { abortEarly: false });
//     if (req.user.id != id) throw new Error('허용되지 않은 요청입니다.');

//     // const users = await User.getMyPage(id);

//     let data = await connection
//       .select(
//         'tu.nick',
//         'tup.weight_kg',
//         'tup.height_cm',
//         'tup.handed',
//         'age',
//         'sex',
//         'ntrp',
//         {
//           play_style: 'tps.name_kor',
//         }
//       )
//       .from({ tu: 't_user' })
//       .innerJoin({ tup: 't_user_physical' }, 'tu.id', '=', 'tup.t_user_id')
//       .leftJoin({ tps: 't_play_style' }, 'tup.t_play_style_id', '=', 'tps.id')
//       .where('tu.id', id);
//     res.json({
//       result: { status: 200, message: 'succeed!!', data: data },
//     });
//   } catch (error) {
//     next(error);
//   }
// });

router.get(
  '/basic_info',
  authMiddlewares.isLoggedIn,
  async (req, res, next) => {
    const {
      id
    } = req.user;
    try {
      await schema.validate({
        id
      }, {
        abortEarly: false
      });
      if (req.user.id != id) throw new Error('허용되지 않은 요청입니다.');

      // const users = await User.getMyPage(id);

      let data = await connection
        .select('tu.nick', 'age', 'sex')
        .from({
          tu: 't_user'
        })
        .innerJoin({
          tup: 't_user_physical'
        }, 'tu.id', '=', 'tup.t_user_id')
        .where('tu.id', id);

      console.log(data);
      res.json({
        result: {
          status: 200,
          message: 'succeed!!',
          data: data
        },
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
    req.body.age = parseInt(req.body.age, 10);
    const {
      nick,
      age,
      sex
    } = req.body;
    const trx = await User.startTransaction();
    try {
      const basicInfo = {
        nick,
        age,
        sex,
      };

      await updateBasicInfoschema
        .validate(basicInfo, {
          abortEarly: true
        })
        .catch(async (err) => {
          console.log(err);
          const _err = await apiError(err.params.label);
          res.status(403);
          throw _err;
        });
      const id = req.user.id;
      const existingNick = await User.query()
        .where({
          nick
        })
        .where('id', '!=', id)
        .first();
      if (existingNick) {
        const err = await apiError('E3021');
        res.status(403);
        throw err;
      }

      await User.query(trx).findById(id).patch({
        nick,
      });

      await UserPhysical.query(trx)
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
        }
      });
      await trx.commit();
    } catch (error) {
      console.log(error);
      await trx.rollback();
      if (error.errorCode == undefined) {
        error = await apiError('E3015');
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