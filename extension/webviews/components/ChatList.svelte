<script>
    import axios from 'axios';

    function sendMsg() {
        console.log("die!!!!");

        //send to backend
        axios.get('/trigger').then(response => {
            console.log(response);
        });
    }
</script>

<h1>Chat</h1>
<!-- unordered list -->
<ul>
    <!-- mesages will be stored as list items to display -->
    <li>hi</li>
    <li>hello</li>
</ul>


<div><input id="messageBox" type="text"></div>
<button on:click={() => sendMsg()}>SEND</button>


