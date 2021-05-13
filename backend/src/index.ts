import express from 'express';

const main = async () => {
    var bodyParser = require('body-parser')

    const app = express();
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())

    const PORT = process.env.PORT || 5000;

    // landing page - go to localhost:5000 to test if this shows up
    app.get('/', (_req, res)=> {
        res.send('hello world!');
    })

    // testing route trigger
    app.get('/trigger', (req, res) => {
        console.log("just got triggered.");
    })

    // activate app on port
    app.listen(PORT, ()=> {
        console.log(`Server started on port ${PORT}`);
    })
};

main();