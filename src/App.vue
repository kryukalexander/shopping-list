<template>
  <div id="app">
    <div class="wrapper">
      <router-view/>
    </div>
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
  }

  #app {
    background-color: #f1f1f1;
    min-height: 100vh;
    font-family: 'Roboto', sans-serif;
  }

  .wrapper {
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
    min-height: 100vh;
  }

  .panel {
    padding: 10px;
    background-color: white;
    margin-bottom: 10px;
  }

  .panel--no-padding {
    padding: 0;
    box-shadow: 0 1px 1px 1px rgba(0,0,0, 0.15);
  }
</style>
