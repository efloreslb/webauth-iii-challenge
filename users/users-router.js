const express = require('express');
const router = express.Router();
const restricted = require('../auth/restricted-middleware.js');

const Users = require('./users-model.js');

router.get('/', async (req, res) => {
   try {
      const users = await Users.get(req.body);
      res.status(201).json(users);
   } catch (err) {
      res.status(500).json(err);
   }
})

module.exports = router;