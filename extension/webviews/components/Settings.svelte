<script>
    import {push, pop, replace, link} from 'svelte-spa-router';
    function navigate() {
          push('/Logout');
      }
  </script>
<div class = "log">
        <button id="logout" on:click|preventDefault={navigate}>logout</button>
      </div>