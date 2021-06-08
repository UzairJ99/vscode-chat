
<script>
    import {push, pop, replace} from 'svelte-spa-router';
    import io from "socket.io-client";
    const socket = io('http://localhost:8080');
    function navigate() {
        push('/Chat');
    }
</script>

<button on:click|preventDefault={navigate}>Login</button>
