<svelte:window on:unload={emitUserDisconnect}/>

<script lang="ts">
    import axios from 'axios';
    import Heading from './Heading.svelte';
    import io from "socket.io-client";
	import { fade } from "svelte/transition";

    const socket = io('http://localhost:8080');
    const placeholder = 'Type your message here...';

    // initial message settings
    let message:string = '';
    let messages:Array<string> = [''];
    let name:string = 'Anonymous';
    let numOfUsers:number = 0;

    /*
        adds the sent message to the array of messages for this chat
        @param: message - the message being sent
    */
    socket.on("message", (message:any) => {		
		messages = messages.concat(message);
	});
	
    /*
        when a new user joins the chat room.
        @param: message - the message being sent
        @param: numUsers - the number of users in the chat room
    */
	socket.on("user joined", ({message, numUsers}:any) => {
		messages = messages.concat(message);
		numOfUsers = numUsers;
	});

    /*
        when a user leaves the chat room
        @param: numUsers - number of users in the room is now updated
    */
	socket.on("user left", (numUsers:any) => {
		numOfUsers = numUsers;
	});

    // disconnects user from socket
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

<Heading text={'Chats'} />


<!-- unordered list will hold all the messages exchanged between the users-->
<ul id="messages">
    <!-- display each message from the messages array as an li tag -->
    {#each messages as message}
        <li transition:fade>{message}</li>
    {/each}
    <!-- mesages will be stored as list items to display -->
    <li class="messageBubble">hi</li>
    <li class="messageBubble">hello</li>
    <!-- after the button is clicked, the text message will be appended
    to the bottom of the list here as a new li element -->

</ul>

<form action="">
    <input id="messageBox" autocomplete="off" {placeholder} bind:value={message} />
    <button id="sendMsgBtn" on:click|preventDefault={sendMsg}>SEND</button>
</form>

<p id="numUsers">There {numOfUsers == 1 ? 'is' : 'are'} {numOfUsers} {numOfUsers == 1 ? 'user' : 'users'} currently chatting!</p>

<!-- Messages UI Ends Here -->


