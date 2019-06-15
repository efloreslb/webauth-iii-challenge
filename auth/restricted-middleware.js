const jwt = require('jsonwebtoken')
const secrets = require('../config/secrets.js')

module.exports = function restricted(req, res, next) {
   const token = req.headers.authorization; // Token passed as "authorization" header

   if (token) {
      jwt.verify(token, secrets.jwt, (err, payload) => {
         if (err) {
            res.status(403).json({ message: "Not authorized" })
         } else {
            req.userId = payload.userId;
            next()
         }
      })
   } else {
      res.status(400).json({ error: "No credentials provided" })
   }
}