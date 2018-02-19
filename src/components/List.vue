<template>
    <div class="shopping-list">

        <div class="shopping-list__form">
            <input type="text" v-model="newItem.name">
            <button v-on:click="addItem()">Add</button>
            <button v-on:click="clearSelected(cart)">Clear selected</button>
        </div>
        <div class="shopping-list__item" v-for="item in cart" v-bind:class="{'shopping-list__item--checked' : item.checked}" v-on:click="toggleItem(item)">
            <list-item v-bind:item="item" v-bind:on-remove="removeItem"/>
        </div>
    </div>
</template>

<script>
    import ListItem from './ListItem'
    import firebase from 'firebase';

    let config = {
        apiKey: "AIzaSyC_cVzjjKOYRUh870jlOepC3RN9el1Wrgs",
        authDomain: "shopping-list-87df2.firebaseapp.com",
        databaseURL: "https://shopping-list-87df2.firebaseio.com",
        projectId: "shopping-list-87df2",
        storageBucket: "shopping-list-87df2.appspot.com"
    };


    let app = firebase.initializeApp(config);
    let db = app.database();
    let cartRef = db.ref('cart');

    export default {
        name: "List",
        components: {
          ListItem
        },

        firebase: {
            cart: cartRef,
        },

        data () {
            return {
                newItem: {
                    checked: false,
                    name: ''
                }
            }
        },

        methods: {
            addItem() {
                if (this.newItem.name !== '') {

                    cartRef.push({
                        checked: false,
                        name: this.newItem.name
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

            toggleItem(item) {
                item.checked = !item.checked;
                const copy = {...item};
                delete copy['.key'];
                cartRef.child(item['.key']).set(copy);
            }
        }
    }
</script>

<style scoped>
    .shopping-list {
        display: flex;
        flex-direction: column;
    }

    .shopping-list__item--checked {
        order: 3;
    }

    .shopping-list__form {
        position: relative;
        margin-bottom: 20px;
    }

    .shopping-list__item {
        margin-bottom: 5px;
    }


</style>