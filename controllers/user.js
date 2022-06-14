const User = require('../models/user');

exports.getEmployees = (req, res) => {
  User.find({}).exec((err, users) => {
    if(err || !users) {
      return res.status(403).json({message: "Unable to load employees"})
    };
    res.status(200).json({ users });
  })
}
