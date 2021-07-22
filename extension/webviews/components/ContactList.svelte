<script>
    import {push, pop, replace, link} from 'svelte-spa-router';
    function navigate() {
          push('/Settings');
      }
  </script>
  <div id = "contactNav">
    <div class = "bar">
      <button id="settings" on:click|preventDefault={navigate}>SETTINGS</button>
    </div>

  </div>


