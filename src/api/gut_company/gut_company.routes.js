const express = require('express');

const queries = require('./gut_company.queryies');
const { orWhereNotExists } = require('../../db');

const router = express.Router();

router.get('/', async (req, res) => {
  const gut_companies = await queries.find();
  res.json(gut_companies);
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;

  try {
    if (isNaN(id)) {
      const error = new Error('Invalid ID');
      res.status(422);
      throw error;
    } else {
      const gut_company = await queries.get(parseInt(id, 10) || 0);
      if (gut_company) {
        return res.json(gut_company);
      }
      return next();
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
