<script>
    import {push, pop, replace, link} from 'svelte-spa-router';
    export let text;
    function navigate() {
          push('/Settings');
      }
  </script>
  <div id = "contactNav">
    <div class = "bar">
      <button id="settings" on:click|preventDefault={navigate}>SETTINGS</button>
    </div>

  </div>


