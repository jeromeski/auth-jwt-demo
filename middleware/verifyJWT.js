const jwt = require("jsonwebtoken");

exports.verifyJWT = (req, res, next) => {
  // extract auth header
  const authHeader = req.headers["authorization"]
  // check if it's there
  if(!authHeader) return res.sendStatus(401);
  // get token
  const token = authHeader.split(" ")[1]
  // verify token
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if(err)return res.sendStatus(403)
    req.user = decoded.username;
    next();
  }) 
}