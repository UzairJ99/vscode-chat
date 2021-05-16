import express from 'express';
import "reflect-metadata";
var cors = require('cors');
var bodyParser = require('body-parser');

const main = async () => {

    const app = express();
    /*
        configuration for cross origin resource sharing since the VS Code API
        is running seperately from our backend server.
        Body parser used for data extraction from HTTP requests.
    */
    app.use(cors({origin: "*"}));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    
    /*
        NOTE: in the terminal run the command npm run watch to recompile
        in the backend directory if the port is not configured correctly 
        or if it's using a previously set up port.
        When refactoring later we will change the app's path to a constant
        variable so ports don't get mixed up.
        If PORT is changed here, also change it in ChatList.svelte's 
        sendMsg() function.
    */
    const PORT = process.env.PORT || 8080;

    // landing page - go to localhost:8080 to test if this shows up
    app.get('/', (_req, res)=> {
        res.send('hello world!');
    });

    // send message from the textbox to the database
    app.post('/sendMessage', (req, res) => {
        // extract text message from the body of the request sent
        let message = req.body;
        console.log(message);
        // replace with socket.io functionality and database functions
        res.send(message);
    })

    // activate app on port
    app.listen(PORT, ()=> {
        console.log(`Back end server started on port ${PORT}`);
    });
};

main();