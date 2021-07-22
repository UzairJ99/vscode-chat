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
        // try {
        //     let response = await axios.get('https://localhost:8080/auth/github');
        // } catch (err) {
        //     console.log(err);
        // }
        
        // console.log(response);
        push('/Chat');
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




