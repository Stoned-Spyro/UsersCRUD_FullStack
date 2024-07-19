<template>
  <div id="app">
    <div class="navbar">
      <div id='name'>
        User Manager
      </div>
    </div>
    <UsersComponent></UsersComponent>
  </div>
</template>

<script>
import UsersComponent from './components/UsersComponent.vue'
export default {
  name: 'App',
  components: {
    UsersComponent
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#name{
  padding-left: 10px;
}
.navbar{
  background-color: lightgrey;
  padding: 20px 0 20px 0;
}
</style>
