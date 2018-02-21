<template>
    <div class="login">
        <input type="text" v-model="email">
        <input type="text" v-model="password">
        <button @click="login()">Login</button>
    </div>
</template>

<script>
    import firebase from 'firebase'

    export default {
        name: "login",
        data() {
            return {

            }
        },
        methods: {

            login() {
                firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
                    function(user){
                        alert('Connected');
                    }
                )
            }
        }
    }
</script>

<style scoped>
    .login {
        background-color: #f2f2f2;
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>