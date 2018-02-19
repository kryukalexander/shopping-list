<template>
    <div class="shopping-list">

        <div  class="shopping-list__form">

            <div class="shopping-list__form-toggler">
                <button @click="toggleProductForm()" class="button">{{ showForm ? 'Скрыть' : 'Показать' }} форму</button>
            </div>

            <div v-if="showForm" class="shopping-list__form-content">
                <div class="field">
                    <div class="columns">
                        <div class="column">
                            <label for="newProductName" class="label">Имя продукта</label>
                            <div class="control">
                                <input id="newProductName" class="input is-large" type="text" v-model="newItem.name">
                            </div>
                        </div>
                        <!--<div class="column is-2-desktop">-->
                        <!--<label for="newProductcount" class="label">Количество</label>-->
                        <!--<div class="control">-->
                        <!--<input id="newProductcount" class="input is-large" type="text" v-model="newItem.count">-->
                        <!--</div>-->
                        <!--</div>-->
                        <!--<div class="column is-2-desktop">-->
                        <!--<label for="newProductUnits" class="label">Единицы</label>-->
                        <!--<div class="control">-->
                        <!--<input id="newProductUnits" class="input is-large" type="text" v-model="newItem.units">-->
                        <!--</div>-->
                        <!--</div>-->
                    </div>

                </div>
                <div class="field is-grouped">
                    <div class="control">
                        <button class="button is-info" v-on:click="addItem()">Добавить</button>
                    </div>
                    <div class="control">
                        <button class="button" v-on:click="clearSelected(cart)">Удалить выбранные</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="shopping-list__item" v-for="item in cart" v-bind:class="{'shopping-list__item--checked' : item.checked}">
            <list-item v-bind:item="item" v-bind:on-remove="removeItem" v-bind:on-toggle="toggleItem" v-bind:on-change="changeItem"/>
        </div>
        <div class="shopping-list__divider"></div>
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
                },

                showForm: true
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
                cartRef.child(item['.key']).child('checked').set(!item.checked);
            },

            changeItem(item) {
                const copy = {...item};
                delete copy['.key'];
                cartRef.child(item['.key']).set(copy);
            },

            toggleProductForm() {
                this.showForm = !this.showForm
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

    .shopping-list__item--checked ~ .shopping-list__divider {
        display: block;
    }

    .shopping-list__form {
        position: relative;
        margin-bottom: 20px;
    }

    .shopping-list__form-toggler {
        margin-bottom: 10px;
    }

    .shopping-list__item {
        margin-bottom: 5px;
    }

    .shopping-list__divider {
        margin: 20px 0;
        height: 1px;
        width: 100%;
        background-color: #ccc;
        display: none;
    }

</style>