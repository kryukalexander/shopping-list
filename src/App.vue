<template>
  <div id="app">
    <div class="wrapper">
      <h1 class="title"> {{ title }} </h1>
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
      return {
          title: 'Список покупок'
      }
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
    background-color: #fff;
    margin: 0 auto;
    min-height: 100vh;
    padding: 10px;
  }
</style>
