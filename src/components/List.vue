<template>
    <div class="list">
        <div class="list__header">
            <div class="list__wrapper">
                <div class="list-form">
                    <input id="newProductName" class="list-form__input" type="text"
                           @keyup.enter="addItem()"
                           v-model="newItem.name" placeholder="Название" autofocus>
                    <button class="button is-info" v-on:click="addItem()">Добавить</button>
                </div>
            </div>
        </div>
        <div class="list__main">
            <div class="list__wrapper">
                <div class="list__items">
                    <div class="list__item" v-for="item in sortedCart"
                         v-bind:class="{'list__item--checked' : item.checked}">
                        <list-item v-bind:item="item" v-bind:on-remove="removeItem" v-bind:on-change="changeItem"/>
                    </div>
                    <div class="list__divider"></div>
                </div>
            </div>
        </div>
        <div class="list__footer">
            <div class="list__wrapper">
                ©2018 Powered by <a href="https://vuejs.org/">vue.js</a> and <a href="https://firebase.google.com/">Google Firebase</a>
            </div>
        </div>
    </div>
</template>

<script>
    import ListItem from './ListItem'
    import firebase from 'firebase';
    import config from '../config';

    let app = firebase.initializeApp(config);
    let db = app.database();
    let cartRef = db.ref('cart');

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
                newItem: {
                    checked: false,
                    name: ''
                },

                sortKey: 'date',
                showForm: true
            }
        },

        computed: {
            sortedCart: function () {
                return this.cart.sort( (a,b) => a.date < b.date )
            }
        },

        methods: {
            addItem() {
                if (this.newItem.name !== '') {
                    cartRef.push({
                        checked: false,
                        name: this.newItem.name,
                        date: Date.now()
                    });
                }

                this.newItem = {
                    checked: false,
                    name: ''
                };
            },

            removeItem(item) {
                cartRef.child(item['.key']).remove()
            },

            clearSelected(array) {
                let toDelete = array.filter((el) => el.checked);
                toDelete.map((el) => { this.removeItem(el)});
            },

            changeItem(item) {
                const copy = {...item};
                delete copy['.key'];
                cartRef.child(item['.key']).set(copy);
            }
        }
    }
</script>

<style scoped lang="scss">

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
            /*background-color: red;*/
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

                & ~ .list__divider {
                    display: block;
                }
            }
        }

        &__divider {
            margin: 20px 0;
            height: 1px;
            width: 100%;
            background-color: #ccc;
            display: none;
            order: 2;
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

            &:focus {
                outline: none;
            }
        }


    }

</style>