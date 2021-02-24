// needed when developing locally in order to use environment variables. 
require('dotenv').config();

// add routes
const adRoutes = require('./src/routes/adRoutes');
const campaignRoutes = require('./src/routes/campaignRoutes');

// adding body-parser and mongoose
const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require('cors');

// Use environment variable for port if it exists, otherwise use port 3000
const port = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
// use routes
adRoutes(app);
campaignRoutes(app);

// database connection
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, 
  {useNewUrlParser: true, 
  useUnifiedTopology: true, 
  useCreateIndex: true, 
  useFindAndModify: false});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const server = app.listen(port, () => console.log(`Listening on port ${port}...`));