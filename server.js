
// requiring and configuring dotenv to access sensitive data using process.env
require('dotenv').config();
const express = require("express");
const app = express();

// Connecting to mongodb atlas
const mongoose = require('mongoose')
try{
  
  const mongoAtlasUri = "mongodb+srv://"+"process.env.MONGO_ATLAS_USER"+":"+"process.env.MONGO_ATLAS_USER"+"@cluster0.anqmb.mongodb.net/imgurbackend?retryWrites=true&w=majority";
  mongoose.connect(mongoAtlasUri, { useNewUrlParser: true, useUnifiedTopology: true }, () => console.log('Connected to mongodb atlas'));
}
catch(err){
console.log('could\'t connect to database')
}


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
app.listen(PORT, (err) => {
  if(err){
    console.log("Error while running server")
  }
  console.log(`Server is running on port ${PORT}.`);
});

