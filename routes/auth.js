const express = require("express");
const router = express.Router();

const { login, handleRefreshToken, handleLogout } = require("../controllers/auth");
const {  runValidation } = require("../validators");
const {userLoginValidator} = require("../validators/auth");


router.get("/test", (req, res) => {
	return res.json({ message: "Hello World" });
});

router.post("/login", userLoginValidator, runValidation, login);
router.get("/refresh", handleRefreshToken);
router.get("/logout", handleLogout);

module.exports = router;
