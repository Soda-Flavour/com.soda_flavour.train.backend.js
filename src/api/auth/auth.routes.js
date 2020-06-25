const express = require('express');
const yup = require('yup');
const bcrypt = require('bcrypt');
const { DB_PREFIX } = require('../../constants/project');

const jwt = require('../../lib/jwt');
const User = require('../users/users.model');
const UserPhysical = require('../user_physical/user_physical.model');
const router = express.Router();

const schema = yup.object().shape({
  nick: yup
    .string()
    .trim()
    .min(2)
    .matches(/[A-Za-z0-9가-힣]+/)
    .required(),
  email: yup.string().trim().email().required(),
  password: yup //최소 8 자, 최대 18자 대문자 하나 이상, 소문자 하나, 숫자 하나 및 특수 문자 하나 이상
    .string()
    .min(8)
    .max(18)
    .matches(/[^A-Za-z]/)
    .matches(/[A-Z]/)
    .matches(/[a-z]/)
    .matches(/[0-9]/)
    .required(),
});

const errorMessages = {
  invalidLogin: '로그인 실패',
  emailInUse: '사용중인 이메일',
};

router.post('/signup', async (req, res, next) => {
  const { nick, email, password } = req.body;
  const trx = await User.startTransaction();
  try {
    const newUser = {
      nick,
      email,
      password,
    };
    await schema.validate(newUser, { abortEarly: false });

    const existingUser = await User.query().where({ email }).first();
    if (existingUser) {
      const error = new Error(errorMessages.emailInUse);
      res.status(403);
      throw error;
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const insertedUser = await User.query(trx).insert({
      nick,
      email,
      password: hashedPassword,
    });

    const insertEemptyUserPhysical = await UserPhysical.query(trx).insert({
      [DB_PREFIX + 'user_i']: insertedUser.id,
    });

    console.log('피지컬~~ 피지컬~');
    console.log(insertEemptyUserPhysical);

    delete insertedUser.password;
    const payload = {
      id: insertedUser.id,
      nick,
      email,
    };
    const token = await jwt.sign(payload);
    res.json({
      user: payload,
      token,
    });
    await trx.commit();
  } catch (error) {
    await trx.rollback();
    next(error);
  }
});

router.post('/signin', async (req, res, next) => {
  const { email, password } = req.body;
  try {
    await schema.validate(
      {
        nick: 'None',
        email,
        password,
      },
      { abortEarly: false }
    );

    const user = await User.query().where({ email }).first();
    if (!user) {
      const error = new Error(errorMessages.invalidLogin);
      res.status(403);
      throw error;
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      const error = new Error(errorMessages.invalidLogin);
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
    next(error);
  }
});

module.exports = router;
