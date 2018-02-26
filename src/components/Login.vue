<template>
    <div class="login">
        <img class="login__icon" src="../../static/favicons/android-chrome-192x192.png" alt="">

        <div class="login__form">
            <input type="email" v-model="email" placeholder="Email">
            <input type="password" v-model="password" placeholder="Password">
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
        background-color: #ffffff;
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        &__form {
            width: 400px;
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

            input:-webkit-autofill {
                border: 1px solid rgb(238, 238, 238);
            }
        }

        &__icon {
            margin-bottom: 20px;
        }
    }
</style>