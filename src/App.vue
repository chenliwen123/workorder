<template>
  <div id="app">
    <router-view/>
    <!--<login></login>-->
  </div>
</template>

<script>
import login from './components/login'
export default {
  name: 'App',
  components:{login},

}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
