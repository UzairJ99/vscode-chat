
<script>
    import {push, pop, replace} from 'svelte-spa-router';
    import io from "socket.io-client";
    const socket = io('http://localhost:8080');
    function navigate() {
        push('/Chat');
    }
</script>
<div id="background">
    <div id="card">
        <button id="login" on:click|preventDefault={navigate}>LOGIN</button>
    </div>
</div>




