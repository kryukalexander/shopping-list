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
        background-color: #f1f1f1;
    }

    #app {
        font-family: 'Roboto', sans-serif;
        height: 100%;
    }

    .env-status {
        position: fixed;
        right: 10px;
        bottom: 10px;
        font-size: 12px;
    }
</style>
