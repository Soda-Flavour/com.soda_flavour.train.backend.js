const express = require('express');
const yup = require('yup');
const bcrypt = require('bcrypt');
const { DB_PREFIX } = require('../../constants/project');

const { signUpValidSchema, signinValidSchema } = require('./auth.validSchema');

const apiError = require('../../lib/apiError');

const jwt = require('../../lib/jwt');
const User = require('../users/user.model');
const UserPhysical = require('../user_physical/user_physical.model');
const router = express.Router();

router.post('/signup', async (req, res, next) => {
  const { nick, email, password } = req.body;
  const trx = await User.startTransaction();
  try {
    const newUser = {
      nick,
      email,
      password,
    };

    await signUpValidSchema
      .validate(newUser, { abortEarly: true })
      .catch(async (err) => {
        const _err = await apiError(err.params.label);
        res.status(403);
        throw _err;
      });

    const existingUser = await User.query().where({ email }).first();
    if (existingUser) {
      const err = await apiError('E3020');
      res.status(403);
      throw err;
    }

    const existingNick = await User.query().where({ nick }).first();
    if (existingNick) {
      const err = await apiError('E3021');
      res.status(403);
      throw err;
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const insertedUser = await User.query(trx).insert({
      nick,
      email,
      password: hashedPassword,
    });

    const insertEemptyUserPhysical = await UserPhysical.query(trx).insert({
      [DB_PREFIX + 'user_id']: insertedUser.id,
    });

    res.json({
      result: { state: 'succeed', messag: 'succeed!!', data: { email: email } },
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
});

router.post('/signin', async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const userData = {
      email,
      password,
    };

    await signinValidSchema
      .validate(userData, { abortEarly: true })
      .catch(async (err) => {
        const _err = await apiError(err.params.label);
        res.status(403);
        throw _err;
      });

    const user = await User.query().where({ email }).first();
    if (!user) {
      const err = await apiError('E3030');
      res.status(403);
      throw err;
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      const err = await apiError('E3030');
      res.status(403);
      throw error;
    }

    const payload = {
      id: user.id,
      nick: user.nick,
      email,
    };
    const token = await jwt.sign(payload);
    res.json({
      user: payload,
      token,
    });
  } catch (error) {
    if (error.errorCode == undefined) {
      error = await apiError('E3100');
    }
    next(error);
  }
});

module.exports = router;
