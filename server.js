
// requiring and configuring dotenv to access sensitive data using process.env
require('dotenv').config();

const express = require("express");
const app = express();


// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// home route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Imgur backend api." });
});

const imagesRoutes = require('./api/routes/images');
app.use('/images', imagesRoutes);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

