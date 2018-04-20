<template>
    <v-footer :color="'white'" :height="'auto'" class="pa-1 caption" >
        <div class="Footer">    
            <div class="Footer__row">
                ©2018 Powered by
                <a href="https://vuejs.org/">vue.js</a> and
                <a href="https://firebase.google.com/">Google Firebase</a>
            </div>

            <div class="Footer__row">
                List icon made by
                <a href="http://www.freepik.com/">Freepik</a> from
                <a href="http://www.flaticon.com">www.flaticon.com</a>
            </div>

            <div v-if="getUsername(username)" class="Footer__row">
                Logged as {{ getUsername(username) }} -
                <a href="#" @click.prevent="logout()">Logout</a>
            </div>
        </div>
    </v-footer>
</template>

<script>
    import firebase from 'firebase';
    
    export default {
        name: "Footer",
        
        data() {
            return {
                username: firebase.auth().currentUser, 
            }
        },
        
        methods: {
            logout() {
                this.username = null;
                firebase.auth().signOut().then(() =>
                    this.$router.replace('login')
                )
            },
            
            getUsername(user) {
                let username = user ? user.email : null;
                return username;
            }
        },

        watch:{
            $route (to){
                this.username = ( to === '/login' ) ? null : firebase.auth().currentUser
            }
        }
    }
</script>

<style lang="scss" scoped>
     
    .Footer {
        &__row {
            display: inline-block;
            vertical-align: middle;
            margin-right: 10px;
        }
    } 
    
</style>