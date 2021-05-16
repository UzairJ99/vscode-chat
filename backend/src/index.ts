import express from 'express';
import "reflect-metadata";
var cors = require('cors');
var bodyParser = require('body-parser');

const main = async () => {

    const app = express();
    app.use(cors({origin: "*"}));
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())
    

    const PORT = process.env.PORT || 8080;

    // landing page - go to localhost:5000 to test if this shows up
    app.get('/', (_req, res)=> {
        res.send('hello world!');
    })

    // testing route trigger
    app.post('/trigger', (req, res) => {
        let data = req.body;
        console.log("it made it!");
        res.send(data["hi"]);
    })

    // activate app on port
    app.listen(PORT, ()=> {
        console.log(`Server started on port ${PORT}`);
    })
};

main();