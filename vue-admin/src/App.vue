<template>
  <div id="app">
    <v-login></v-login>
    <router-view/>
  </div>
</template>

<script>
import login from './views/Login'
export default {
  name: 'App',
  components: {
    'v-login': login
  }
}
</script>

<style>
html,body,#app{
  height: 100%;
  min-width:999px;
  background: #F2F6FC;
}
#app {
  font-size: 14px;
  font-family: 'Microsoft Yahei', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-width: 999px;
}

</style>
