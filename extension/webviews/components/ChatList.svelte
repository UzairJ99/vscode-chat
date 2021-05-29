<svelte:window on:unload={emitUserDisconnect}/>

<script>
    import axios from 'axios';
    import Heading from './Heading.svelte';
    import io from "socket.io-client";
	import { fade } from "svelte/transition";

    const socket = io('http://localhost:8080');
    const placeholder = 'Type your message here...';

    // initial message settings
    let message = '';
    let messages= [];
    let name= 'Anonymous'; // pull this from github oauth after sign in
    let numOfUsers = 0;

    /**
     * add the message to the array of messages for this chat
     * @param {string} message - the message
     * @return {void}
    */
    socket.on("message", (message) => {		
		messages = messages.concat(message);
	});
	
    /**
     * increase users in chat and connect user to socket.io server
     * @param {string} message - the message
     * @param {number} numUsers - current amount of users in chat room
     * @return {void}
    */
	socket.on("user joined", ({message, numUsers}) => {
		messages = messages.concat(message);
		numOfUsers = numUsers;
	});

    /**
     * disconnect user from socket.io server
     * @param {number} numUsers - current number of users in chat room
     * @return {void}
    */
	socket.on("user left", (numUsers) => {
		numOfUsers = numUsers;
	});

    /**
     * disconnects user from socket
     * @param {string} name - username
     * @return {void}
     */
	function emitUserDisconnect() {
		socket.emit('user disconnect', name); 
	}

    // sends the message from the textbox to the backend
    function sendMsg() {
        // check for valid input and trim white space
        message = message.trim();
        if (message === '') {
            return;
        }

        let messageString = `${name}: ${message}`;
        messages = messages.concat(messageString);
        // let the backend know a message has been sent
		socket.emit("message", messageString);

        // data object being sent to the backend
        let data = {
            name: name,
            text: message
        }

        // headers parameters for POST request
        const headers = {
            "Content-type": "application/json",
        }

        // send to backend to store in database message history
        axios.post('http://localhost:8080/sendMessage', data, {headers})
        .then(response => {
            console.log(response);
        });

        // clear
        message = '';
    }

</script>

<!-- Messages UI Starts Here -->

<Heading text={''} />

<!-- unordered list will hold all the messages exchanged between the users-->
<ul id="messages">
    <!-- display each message from the messages array as an li tag -->
    {#each messages as message}
    <div>
        <li class="messageBubble" transition:fade>{message}</li>
    </div>
        
    {/each}
</ul>

<form action="">
    <span id="messageSpan">
        <input id="messageBox" autocomplete="off" {placeholder} bind:value={message} />
        <button id="sendMsgBtn" on:click|preventDefault={sendMsg}>SEND</button>    
    </span>
</form>

<p id="numUsers">There {numOfUsers == 1 ? 'is' : 'are'} {numOfUsers} {numOfUsers == 1 ? 'user' : 'users'} currently chatting!</p>

<!-- Messages UI Ends Here -->


