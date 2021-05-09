import express from 'express';

const main = async () => {
    const app = express();
    const PORT = process.env.PORT || 5000;

    // landing page - go to localhost:5000 to test if this shows up
    app.get('/', (_req, res)=> {
        res.send('hello world!');
    })

    // activate app on port
    app.listen(PORT, ()=> {
        console.log(`Server started on port ${PORT}`);
    })
};

main();