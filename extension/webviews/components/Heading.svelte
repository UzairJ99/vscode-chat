
<script>
  import {push, pop, replace, link} from 'svelte-spa-router';
import { svg_element } from 'svelte/internal';
  export let text;
  function navigate() {
        push('/Contacts');
    }
</script>

<style>
   
</style>

<div class = "nav-wrapper">
  <div class="topnav">
    <div class="circle">
      <span class="dot"></span>
    </div>
   <div class="add"></div>
    <span>
    <i class="arrow left" id="back" on:click|preventDefault={navigate}>
    </i>
    </span>
    <a href="#Name">{text}</a>
    <p>Activity Status</p>
    <!-- svelte-ignore a11y-missing-attribute -->
    
  </div>
</div>
