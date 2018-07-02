<template>
    <v-app>
        <div class="app-content">
            <router-view/>
        </div>
        <div role="banner" v-if="!production" class="env-status">Dev mode</div>
        <Footer></Footer>
    </v-app>
</template>

<script>
    import { isProd }  from './setup/firebaseSetup';
    import Footer from './components/Footer';
    export default {
        name: 'App',
        components: {
            Footer
        },
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
    
    html {
        overflow-y: auto;
    }

    html, body {
        margin: 0;
        padding: 0;
        height: 100%;
        background-color: #fff;
    }

    #app {
        font-family: 'Roboto', sans-serif;
        background-color: #F5F5F5;
        min-height: 100%;
    }

    .application--wrap {
        min-height: 100% !important;
    }
    
    .app-content {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        width: 100%;
    }

    .env-status {
        position: fixed;
        right: 10px;
        bottom: 50px;
        font-size: 20px;
        font-weight: bold;
        padding: 4px 10px;
        color: white;
        background-color: #ff5252 ;
        border-radius: 5px;
        text-transform: uppercase;
    }
</style>
