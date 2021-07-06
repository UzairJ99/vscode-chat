import express from 'express';
var bodyParser = require('body-parser');
var cors = require('cors');
const app = express();

/*
      configuration for cross origin resource sharing since the VS Code API
      is running seperately from our backend server.
      Body parser used for data extraction from HTTP requests.
*/
app.use(cors({origin: "*"}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
   
// landing page - go to localhost:8080 to test if this shows up
app.get('/', (_req, res)=> {
    res.send("HI");  
});

export default app