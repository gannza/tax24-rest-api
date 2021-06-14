require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const apis = require('./routes/api');

app.use(cors());
//parse application/json and look for raw text
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json'}));






const version = process.env.API_VERSION || '/v1';
const prefix = process.env.API_PREFIX || '/api';

app.use(`${version}${prefix}`, apis);

app.use('/',(req, res) => res.status(200).send({
  status: 200,
  message: 'Welcome to '+process.env.APP_NAME,
}));



      

const port = process.env.APP_PORT || 4000;
const url = process.env.APP_URL + ':' + port || 'http://localhost:' + port;

app.listen(port, () => console.log(process.env.APP_NAME+ ' api', `Server is running on ${url}`));
module.exports = app;
// Create Driver Model
//npx sequelize-cli model:generate --name driver --attributes name:string,email:string,number:string,status:string,latitude:string,longitude:string,country:string,city:string,state:string,streetName:string,streetNumber:string

//CREATE DRIVER SEEDER
//npx sequelize-cli seed:generate --name driver