<template>
    <div class="List">
        <v-toolbar :color="'error'" :fixed="true">
            <div class="list-form">
                <v-text-field 
                    :dark="true"
                    placeholder="Название"
                    @keyup.enter="addItem()"
                    v-model="newString"
                    :autofocus="true"
                    :hide-details="true"
                    :color="'white'"
                />

                <v-btn v-on:click="addItem()"> <v-icon>add</v-icon> Добавить</v-btn>
            </div>
        </v-toolbar>
        <div class="List__main">
            <div class="List__wrapper">
                <div class="List__items">
                    <transition name="fade">
                        <div v-if="hasCheckedItems" class="List__divider">
                            <a href="#" @click.prevent="toggleCheckedItems()">{{showCheckedItems ? 'Скрыть' : 'Показать'}} отмеченные</a>
                            <a href="#" @click.prevent="removeCheckedItems(cart)">Удалить отмеченные</a>
                        </div>
                    </transition>
                    <transition-group name="flip-list">
                        <div class="List__item" v-for="item in sortedCart" :key="item['.key']"
                             v-show="!(item.checked && !showCheckedItems)"
                             v-bind:class="{'list__item--checked' : item.checked}">
                            <list-item v-bind:item="item" v-bind:on-remove="removeItem" v-bind:on-change="changeItem"/>
                        </div>
                    </transition-group>

                </div>
            </div>
        </div>
        <div class="List__footer">
            <div class="List__wrapper">
                <div class="List__footer-row">
                    ©2018 Powered by <a href="https://vuejs.org/">vue.js</a> and <a href="https://firebase.google.com/">Google Firebase</a>
                </div>
                <div class="List__footer-row">
                    Logged as {{ username }} - <a href="#" @click.prevent="logout()">Logout</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import ListItem from './ListItem'
    import { cartRef } from '../firebaseSetup'
    import firebase from 'firebase'


    export default {
        name: "List",
        components: {
          ListItem
        },

        firebase: {
            cart: cartRef
        },

        data () {
            return {
                itemSeparator: ',',
                newString: '',
                showForm: true,
                username: firebase.auth().currentUser.displayName || firebase.auth().currentUser.email,
                showCheckedItems: true
            }
        },

        computed: {
            sortedCart() {
                this.cart = this.cart.sort( (a,b) => a.date < b.date );
                this.cart = this.cart.sort( (a,b) => a.checked > b.checked );
                return this.cart;
            },

            hasCheckedItems() {
                return this.cart.some((el) => el.checked)
            },
        },

        methods: {
            addItem() {
                if (this.newString !== '') {
                    let date = Date.now();
                    let items = this.newString.split(this.itemSeparator);
                    items.map((el) => {
                        if (el.trim() !== '' ) {
                            cartRef.push({
                                checked: false,
                                name: el.trim(),
                                date: date,
                            });
                        }

                    });
                    this.newString = '';
                }
            },

            removeItem(item) {
                cartRef.child(item['.key']).remove()
            },

            removeCheckedItems(array) {
                let toDelete = array.filter((el) => el.checked);
                toDelete.map((el) => { this.removeItem(el)});
            },

            toggleCheckedItems() {
                this.showCheckedItems = !this.showCheckedItems;
            },

            changeItem(item, keepDate) {
                const copy = {...item};
                delete copy['.key'];
                if (!keepDate) {
                    copy.editDate = Date.now();
                }
                cartRef.child(item['.key']).set(copy);
            },

            logout() {
                firebase.auth().signOut().then(() =>
                    this.$router.replace('login')
                )
            }
        }
    }
</script>

<style lang="scss">
    
    $animation-duration: .25s;
    
    .fade-enter-active, .fade-leave-active {
        transition: all $animation-duration;
    }

    .fade-enter-to {
        transform: translateY(0);
        opacity: 1;
    }
    
    .fade-enter, .fade-leave-to {
        transform: translateY(-50px);
        opacity: 0;
    }
    
    .flip-list-move {
        transition: all $animation-duration * 2;
    }

    .flip-list-enter {
        opacity: 0;
        transition: opacity $animation-duration;
    }

    .flip-list-enter-to {
        opacity: 1;
    }
    
    .flip-list-leave-to {
        opacity: 0;
        transform: translateX(100%);
        transition: all $animation-duration;
    }
    
    .List {
        min-height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        overflow: hidden;

        &__wrapper {
            width: 100%;
            max-width: 1000px;
            margin: 0 auto;
            padding: 0 10px;
        }

        &__footer {
            flex-grow: 0;
            flex-shrink: 0;
            font-size: 12px;
            color: #999;
            padding: 10px 0;
            background-color: #fff;
            box-shadow: 0 0 2px 0 rgba(0,0,0,0.05);
        }

        &__main {
            width: 100%;
            flex-grow: 1;
            padding: 75px 0 10px;
            overflow-y: auto;
            overflow-x: hidden;

        }

        &__items {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
        }

        &__item {
            margin-bottom: 10px;
            order: 1;

            &--checked {
                order: 3;
            }
        }

        &__divider {
            margin: 20px 0;
            display: flex;
            width: 100%;
            align-items: center;

            &:before {
                content: '';
                height: 1px;
                background-color: #ccc;
                flex-grow: 1;
                flex-shrink: 0;
            }

            a {
                margin-left: 15px;
                flex-grow: 0;

                @media (max-width: 480px) {
                    width: 100px;
                    text-align: center;
                }
            }
        }

        &__footer-row {
            display: inline-block;
            vertical-align: middle;
            margin-right: 10px;
        }
    }

    .list-form {
        width: 100%;
        max-width: 1000px;
        padding: 0 10px;
        margin: 0 auto;
        display: flex;
        
        .btn {
            margin-top: 17px;
            margin-right: 0;
        }
    }

</style>