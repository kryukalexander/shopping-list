<template>
    <div class="login">
        <img class="login__icon" src="../../static/favicons/android-chrome-192x192.png" alt="">

        <div class="login__form">
            <v-text-field
                    type="email"
                    name="Login"
                    label="Login"
                    v-model="email"
                    :color="'error'"
            />
            <v-text-field
                    label="Password"
                    name="Password"
                    v-model="password"
                    :type="showPassword ? 'password' : 'text'"
                    :append-icon="showPassword ? 'visibility' : 'visibility_off'"
                    :append-icon-cb="() => (showPassword = !showPassword)"
                    :color="'error'"
            />

            <v-btn @click="login()" color="error">Login</v-btn>
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
                error: false,
                showPassword: false
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
        }

        &__icon {
            margin-bottom: 20px;
        }
    }
</style>