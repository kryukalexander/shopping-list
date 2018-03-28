<template>
    <div class="login">
        <img class="login__icon" src="../../static/img/logo.svg" alt="">

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

            <v-btn @click="login()" :color="'error'">Login</v-btn>
            <span v-if="error">{{error}}</span>
        </div>
        
        <div class="login__credits">
            List icon made by <a href="http://www.freepik.com/">Freepik</a> from <a href="http://www.flaticon.com">www.flaticon.com</a>
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
            border-radius: 10px;
        }

        &__icon {
            margin-bottom: 20px;
            width: 200px;
        }
        
        &__credits {
            position: absolute;
            left: 5px;
            bottom: 5px;
            font-size: 11px;
        }
    }
</style>