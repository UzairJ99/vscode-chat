<script>
    import axios from 'axios';

    function sendMsg() {
        data = {
            "hi": "hi"
        }

        //send to backend
        axios.post('/trigger', data).then(response => {
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


