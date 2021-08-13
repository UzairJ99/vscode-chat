<!-- <style>
    @import url('https://fonts.googleapis.com/css2?family=Varela+Round&display=swap');
</style> -->
<script>
    import {push, pop, replace} from 'svelte-spa-router';
    import io from "socket.io-client";
    import axios from 'axios';
    let logo= "images/github-logo.png";
    const socket = io('http://localhost:8080');
    async function navigate() {
        try {
            var response = await axios.get('http://localhost:3002/login');
            console.log("success")
        } catch (err) {
            console.log(err);
        }
        
        
    }
</script>
<div id="background">
    <div id="title">
        <h1 id="vschat">VS CHAT</h1>
    </div>
    <div id="card">
        <h2 id="cardTitle">GitHub Sign In</h2>
        <button id="login" on:click|preventDefault={navigate}><div id="githubLogo"></div></button>
    </div>
</div>




