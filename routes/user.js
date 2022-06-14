const express = require("express");
const router = express.Router();

const { getEmployees } = require('../controllers/user');
const { verifyJWT } = require('../middleware/verifyJWT');


router.get("/employees", verifyJWT, getEmployees);

module.exports = router;