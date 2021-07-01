<script>
    import Router from 'svelte-spa-router';
    import ChatList from "./ChatList.svelte";
import ContactList from './ContactList.svelte';
    import Login from "./Login.svelte";
import Settings from './Settings.svelte';
    
    const routes = {
        '/': Login,
        '/Chat': ChatList,
        '/Contacts': ContactList,
        '/Settings':Settings,
        '/Logout':Login 
    };
</script>

<Router {routes}/>

