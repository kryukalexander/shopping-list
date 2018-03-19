<template>
    <div class="list">
        <div class="list__header">
            <div class="list__wrapper">
                <div class="list-form">
                    <input id="newProductName" class="list-form__input" type="text"
                           @keyup.enter="addItem()"
                           v-model="newString" placeholder="Название" autofocus>
                    <button class="button is-info" v-on:click="addItem()">Добавить</button>
                </div>
            </div>
        </div>
        <div class="list__main">
            <div class="list__wrapper">
                <div class="list__items">
                    <transition-group name="flip-list">
                        <div class="list__item" v-for="item in sortedCart" :key="item['.key']"
                             v-show="!(item.checked && !showCheckedItems)"
                             v-bind:class="{'list__item--checked' : item.checked}">
                            <list-item v-bind:item="item" v-bind:on-remove="removeItem" v-bind:on-change="changeItem"/>
                        </div>
                    </transition-group>
                    <div v-if="hasCheckedItems" class="list__divider">
                        <a href="#" @click.prevent="toggleCheckedItems()">{{showCheckedItems ? 'Скрыть' : 'Показать'}} отмеченные</a>
                        <a href="#" @click.prevent="removeCheckedItems(cart)">Удалить отмеченные</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="list__footer">
            <div class="list__wrapper">
                <div class="list__footer-row">
                    ©2018 Powered by <a href="https://vuejs.org/">vue.js</a> and <a href="https://firebase.google.com/">Google Firebase</a>
                </div>
                <div class="list__footer-row">
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
                        cartRef.push({
                            checked: false,
                            name: el.trim(),
                            date: date,
                        });
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

<style scoped lang="scss">
    
    $duration: .25s;
    
    .flip-list-move {
        transition: all $duration;
    }

    .flip-list-enter {
        opacity: 0;
        transition: opacity $duration;
    }

    .flip-list-enter-to {
        transform: translateX(0);
        opacity: 1;
    }
    
    .flip-list-leave-to {
        opacity: 0;
        transition: all $duration;
        transform: translateX(100%);
    }
    
    .list {
        min-height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;

        &__wrapper {
            width: 100%;
            max-width: 1000px;
            margin: 0 auto;
            padding: 0 10px;
        }

        &__header {
            flex-grow: 0;
            flex-shrink: 0;
            background-color: #fff;
            padding: 10px 0 5px;
            position: fixed;
            width: 100%;
            left: 0;
            top: 0;
            z-index: 10;
            box-shadow: 0 0 4px 2px rgba(0,0,0,0.15);
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
            padding: 65px 0 10px;
            overflow: auto;

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
            order: 2;
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
        display: flex;

        &__input {
            flex-grow: 1;
            border: none;
            border-bottom: 1px solid #cccccc;
            background-color: transparent;
            font-size: 20px;
            line-height: 35px;
            padding: 0;
            margin-right: 20px;
            min-width: 180px;

            &:focus {
                outline: none;
            }
        }
    }

</style>