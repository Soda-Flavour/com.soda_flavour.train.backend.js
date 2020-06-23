const express = require('express');

const User = require('./users.model');
const { orWhereNotExists } = require('../../db');
const router = express.Router();

router.get('/', async (req, res) => {
  const users = await User.query()
    .select('id', 'email', 'nick')
    .where('deleted_at', null);
  res.json(users);
});

router.post('/', async (req, res) => {
  console.log('전달받은 바디');
  console.lop(req.body);

  try {
    const user = await User.query.insert(req.body);
  } catch (error) {}
});

module.exports = router;
