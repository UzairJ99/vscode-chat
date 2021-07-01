
<script>
    import {push, pop, replace} from 'svelte-spa-router';
    import io from "socket.io-client";
    let logo= "images/github-logo.png";
    const socket = io('http://localhost:8080');
    function navigate() {
        push('/Chat');
    }
</script>
<div id="background">
    VS CHAT
    <div id="card">
        <button id="login" on:click|preventDefault={navigate}><div id="logo"></div></button>
    </div>
</div>




