<svelte:head>
    <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">
</svelte:head>
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




