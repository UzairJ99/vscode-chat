<script lang="ts">
    import axios from 'axios';

    function sendMsg() {
        // data object being sent to the backend
        var data = {
            "hi": "hi"
        }

        // headers parameters for POST request
        const headers = {
            "Content-type": "application/json",
        }

        // send to backend
        axios.post('http://localhost:8080/sendMessage', data, {headers})
        .then(response => {
            console.log(response);
        });
    }
</script>

<!-- Messages UI Starts Here -->

<h1>Chat</h1>


<!-- unordered list will hold all the messages exchanged between the users-->
<ul id="messages">
    <!-- mesages will be stored as list items to display -->
    <li class="messageBubble">hi</li>
    <li class="messageBubble">hello</li>
    <!-- after the button is clicked, the text message will be appended
    to the bottom of the list here as a new li element -->

</ul>


<div><input id="messageBox" type="text"></div>
<button id="sendMsgBtn" on:click={() => sendMsg()}>SEND</button>

<!-- Messages UI Ends Here -->


