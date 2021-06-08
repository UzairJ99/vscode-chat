<script>
    import Router from 'svelte-spa-router';
    import ChatList from "./ChatList.svelte";
    import Login from "./Login.svelte";
    
    const routes = {
        '/': Login,
        '/Chat': ChatList
    };
</script>

<Router {routes}/>

