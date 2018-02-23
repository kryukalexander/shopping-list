<template>
    <div class="login">
        <div class="login__form">
            <input type="text" v-model="email">
            <input type="text" v-model="password">
            <button @click="login()">Login</button>
            <span v-if="error">{{error}}</span>
        </div>
    </div>
</template>

<script>
    import firebase from 'firebase'

    export default {
        name: "login",
        data() {
            return {
                email: '',
                password: '',
                error: false
            }
        },
        methods: {

            login() {
                firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
                    (user) => {
                        console.log(user);
                        this.$router.replace('list')
                    },
                    (err) => { this.error = err.message}
                )
            }
        }
    }
</script>

<style lang="scss" scoped>
    .login {
        background-color: #f2f2f2;
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        &__form {
            width: 500px;
            max-width: 100%;
            padding: 20px;
            background-color: #fff;
            border-radius: 10px;
            box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.15);

            * {
                display: block;
                width: 100%;

                &:not(:last-child) {
                    margin-bottom: 10px;
                }
            }
        }
    }
</style>