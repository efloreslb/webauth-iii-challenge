const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const restricted = require('../auth/restricted-middleware.js');
const secrets = require('../config/secrets.js');
const Users = require('../users/users-model.js')

function generateToken(user) {
   return jwt.sign({
      userId: user.id //payload
   }, secrets.jwt, { //secret
      expiresIn: '1h', //options
   })
};

router.post('/register', async (req, res) => {
   let user = req.body;
   const hash = bcrypt.hashSync(user.password, 10); // Hash password
   user.password = hash;

   try {
      const newUser = await Users.add(user);

      const token = generateToken(newUser);

      res.status(201).json(newUser)
   } catch (err) {
      res.status(500).json(err);
   }
})

// router.post('/register', (req, res) => {
//    let user = req.body;
//    const hash = bcrypt.hashSync(user.password, 10);
//    user.password = hash;
 
//    Users.add(user)
//      .then(saved => {
//        const token = generateToken(saved)
//        res.status(201).json({
//          authToken: token
//        });
//      })
//      .catch(error => {
//        res.status(500).json(error);
//      });
//  });

router.post('/login', async (req, res) => {
   let { username, password } = req.body;
   
   try {
      const user = await Users.getBy({username}).first();

      if (user && bcrypt.compareSync(password, user.password)) { // Compare password
         //req.session.user = user; //Create Session
         const token = generateToken(user); //Create Token

         res.status(200).json({ 
            message: `Welcome ${user.username}, you are logged in.`,
            authToken: token, // Return token with response
         });
      } else {
         res.status(401).json({ message: "Invalid Credentials"})
      }
   } catch {
      res.status(500).json({err: "Error logging in"});
   }
})

// router.post('/login', (req, res) => {
//    let { username, password } = req.body;
 
//    Users.getBy({ username })
//      .then(user => {
//        if (user && bcrypt.compareSync(password, user.password)) {
//          const token = generateToken(user)
 
//          res.status(200).json({
//            message: `Welcome ${user.username}!`,
//            authToken: token,
//          });
//        } else {
//          res.status(401).json({ message: 'Invalid Credentials' });
//        }
//      })
//      .catch(error => {
//        res.status(500).json(error);
//      });
//  });

router.get('/logout', restricted, async (req, res) => {
   if (req.session) {
      req.session.destroy(err => {
         if(err) {
            res.status(500).json({message: "Error logging out"});
         } else {
            res.end();
         }
      })
   }
})

module.exports = router;