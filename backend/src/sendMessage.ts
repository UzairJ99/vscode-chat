import {app} from "./auth"

// send message from the textbox to the database
app.post('/sendMessage', (req, res) => {
    // extract text message from the body of the request sent
    let message = req.body;
    console.log(message);
    // replace with socket.io functionality and database functions
    res.send(message);
});

export default app