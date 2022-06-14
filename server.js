const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require("morgan");
const { readdirSync } = require("fs");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// db
mongoose
	.connect(process.env.DATABASE_CLOUD, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log("DB connected"))
	.catch((err) => console.log(err));

// middlewares
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "2mb" }));
app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(cookieParser());

// routes middleware
readdirSync("./routes").map((r) => app.use("/api", require("./routes/" + r)));

const port = 8000 || process.env.PORT;

app.listen(port, () => console.log(`Server running on PORT: ${port}`));



/* 
==============================
  fs.readdirSync() method
==============================

The fs.readdirSync() method is used to synchronously 
read the contents of a given directory. The method 
returns an array with all the file names or objects 
in the directory. The options argument can be used to 
change the format in which the files are returned 
from the method.

*/
