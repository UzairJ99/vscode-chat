<script lang="ts">
    import { onMount } from "svelte";
    import axios from 'axios';

    function sendMsg() {
        var data = {
            "hi": "hi"
        }
        const headers = {
                "content-type": "application/json"
            }
        //send to backend
        axios.post('http://localhost:5000/trigger', data,{headers}).then(response => {
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


