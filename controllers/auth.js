const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.login = (req, res) => {
	const { user, password } = req.body;
	User.find({ $or: [{ username: user }, { email: user }] }).exec((err, _user) => {
		const foundUser = _user[0];
		// find email or username
		// _user is an array
		if (err || !foundUser) {
			return res.status(400).json({
				message: "User not found."
			});
		}
		// authenticate
		if (foundUser.password !== password) {
			return res.status(400).json({
				message: "Username and Password mismatch"
			});
		}

		const accessToken = jwt.sign(
			{ username: foundUser.username },
			process.env.ACCESS_TOKEN_SECRET,
			{ expiresIn: "30s" }
		);

		const refreshToken = jwt.sign(
			{ username: foundUser.username },
			process.env.REFRESH_TOKEN_SECRET,
			{ expiresIn: "1d" }
		);

    foundUser.refreshToken = refreshToken;

    foundUser.save();


		res.cookie("jwt", refreshToken, {
			httpOnly: true,
			maxAge: 24 * 60 * 60 * 1000
		});
		res.status(200).json({
			accessToken
		});
	});
};


exports.handleRefreshToken = (req, res, next) => {
  const cookies = req.cookies;
  if(!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;
  User.find({refreshToken}).exec((err, user) => {
    if(err) return res.sendStatus(401); 
    const foundUser = user[0];
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
      if(err || foundUser.username !== decoded.username) return res.sendStatus(403);
       const accessToken = jwt.sign({"username": decoded.username}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "30s"});
       console.log(accessToken);
       res.json({ accessToken });
    });
  })
};

exports.handleLogout = (req, res, next) => {
	const cookies = req.cookies;
	if (!cookies?.jwt) return res.sendStatus(401);
	const refreshToken = cookies.jwt;
	User.find({ refreshToken }).exec((err, user) => {
    const foundUser = user[0];
		if (err || foundUser.refreshToken !== refreshToken) {
      res.clearCookie("jwt", { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
      return res.sendStatus(204);
    }
    foundUser.refreshToken = "";
    foundUser.save();
    console.log("cookie -->", foundUser.refreshToken)
    res.clearCookie("jwt", {httpOnly: true,  maxAge: 24 * 60 * 60 * 1000});
    res.sendStatus(204);
	});
};