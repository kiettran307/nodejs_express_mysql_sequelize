const express = require("express");
const bodyParser = require("body-parser");
const logger = require('morgan');
const cors = require('cors');
const app = express();
const mysql = require('./app/config/mysql');
mysql.initDatabase();
const userRoute = require('./app/routes/user');

app.use(
  bodyParser.urlencoded({
      extended: false
  })
);
app.use(bodyParser.json());
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use('/', userRoute);
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

// require("./app/routes/customer.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
