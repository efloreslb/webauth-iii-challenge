const express = require('express');
const helmet = require('helmet');
const session = require('express-session');

const authRouter = require('./auth/auth-router.js');
const usersRouter = require('./users/users-router.js');

const server = express();

const sessionConfig = {
   name: 'session-name',
   secret: 'secret key',
   resave: false,
   saveUninitialized: false,
   cookie: {
      maxAge: 1000 * 60 * 60,
      secure: false,
      httpOnly: true,
   },
}

server.use(session(sessionConfig));
server.use(helmet());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);

server.get('/', (req, res) => {
   res.send("Welcome to Web Auth App")
})

module.exports = server;