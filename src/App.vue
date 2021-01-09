<template>
  <div id="app">
    <Navbar/>
    <router-view/>
  </div>
</template>

<script>
import Navbar from "./components/nav.vue";

export default {
  components: {Navbar},
  data() {
    return {

    }

  },
  mounted(){
    // window.onbeforeunload = localStorage.setItem("UserOnline", JSON.stringify(""))
    // window. onbeforeunload = function() { localStorage.setItem("UserOnline", JSON.stringify("")) };
  }

  
}
</script>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
} */
</style>
