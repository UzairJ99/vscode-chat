import "reflect-metadata";
import server from './socket'

const main = () => {
    
    /*
        NOTE: in the terminal run the command npm run watch to recompile
        in the backend directory if the port is not configured correctly 
        or if it's using a previously set up port.
        When refactoring later we will change the app's path to a constant
        variable so ports don't get mixed up.
        If PORT is changed here, also change it in ChatList.svelte's 
        sendMsg() function.
    */
    // connect to database
    const PORT = process.env.PORT || 8080;

    // activate app on port
    server.listen(PORT, ()=> {
        console.log(`Back end server started on port ${PORT}`);
    });

};

main();