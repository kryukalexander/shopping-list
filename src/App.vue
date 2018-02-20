<template>
  <div id="app">
      <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
      return {}
  }
}
</script>

<style>

  * {
    box-sizing: border-box;
  }

  html, body {
    margin: 0;
    padding: 0;
    height: 100%;
    background-color: #f1f1f1;
  }

  #app {
    font-family: 'Roboto', sans-serif;
      height: 100%;
  }
</style>
