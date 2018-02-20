<template>
    <div class="shopping-list">

        <div  class="panel">
            <div class="shopping-list__form-content">
                <input id="newProductName" class="input is-large" type="text"
                       @keyup.enter="addItem()"
                       v-model="newItem.name" placeholder="Название">
                <button class="button is-info" v-on:click="addItem()">Добавить</button>
            </div>
        </div>
        <div class="shopping-list__items">
            <div class="panel panel--no-padding" v-for="item in sortedCart"
                 v-bind:class="{'shopping-list__item--checked' :
            item.checked}">
                <list-item v-bind:item="item" v-bind:on-remove="removeItem" v-bind:on-change="changeItem"/>
            </div>
            <div class="shopping-list__divider"></div>
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

<style scoped>
    .shopping-list {
        /*display: flex;*/
        /*flex-direction: column;*/
    }

    .shopping-list__items {
        display: flex;
        flex-direction: column;
        padding: 10px;
    }

    .shopping-list__item--checked {
        order: 3;
    }

    .shopping-list__item--checked ~ .shopping-list__divider {
        display: block;
    }

    .shopping-list__divider {
        margin: 20px 0;
        height: 1px;
        width: 100%;
        background-color: #ccc;
        display: none;
    }

</style>