<template>
    <div id="app">

        <router-view/>
        <div v-if="!production" class="env-status">Dev mode</div>
    </div>
</template>

<script>
    import { isProd }  from './firebaseSetup';
    export default {
        name: 'App',
        data() {
            return {
                production: isProd
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
        height: 100%;
        background-color: #fff;
    }

    #app {
        font-family: 'Roboto', sans-serif;
        height: 100%;
        background-color: #f1f1f1;
    }

    .env-status {
        position: fixed;
        right: 10px;
        bottom: 60px;
        font-size: 12px;
        font-weight: bold;
        padding: 4px 10px;
        color: white;
        background-color: red;
        border-radius: 5px;
        text-transform: uppercase;
    }
</style>
