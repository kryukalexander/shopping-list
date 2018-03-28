<template>
    <div class="List">
        <v-toolbar :color="'error'" :fixed="true" :height="64">
            <div class="list-form">
                <v-text-field 
                    solo
                    flat
                    placeholder="Название"
                    @keyup.enter="addItem()"
                    v-model="newString"
                    :autofocus="true"
                    :hide-details="true"
                />

                <v-btn icon dark v-on:click="addItem()"><v-icon>add</v-icon></v-btn>
            </div>
        </v-toolbar>
        <div class="List__main">
            <div class="List__items List__wrapper">
                <div v-if="cart.length === 0" class="List__empty display-2">
                    Пока здесь пусто.
                </div>
                <div class="List__info" v-if="cart.length !== 0">
                    
                    <div class="List__counter title">
                        {{ checkedItemsCount }}/{{cart.length }}
                    </div>
                    
                    <v-btn v-if="checkedItemsCount"  @click.prevent="toggleCheckedItems()" icon>
                        <v-icon>{{!showCheckedItems ? 'visibility' : 'visibility_off'}}</v-icon>
                    </v-btn>
                    
                    <v-btn v-if="checkedItemsCount"  @click.prevent="removeCheckedItems(cart)" icon>
                        <v-icon>delete</v-icon>
                    </v-btn>
                
                </div>
                
                <transition-group name="flip-list">
                    
                    <list-item v-for="item in sortedCart"
                               v-show="!(item.checked && !showCheckedItems)"
                               :key="item['.key']" 
                               :item="item" 
                               :on-remove="removeItem" 
                               :on-change="changeItem"
                    />

                </transition-group>
            </div>
        </div>
        <v-footer :color="'white'" :height="'auto'" class="pt-1 pb-1 caption" >
            <div class="List__wrapper">
                <div class="List__footer-row">
                    ©2018 Powered by <a href="https://vuejs.org/">vue.js</a> and <a href="https://firebase.google.com/">Google Firebase</a>
                </div>
                <div class="List__footer-row">
                    Logged as {{ username }} - <a href="#" @click.prevent="logout()">Logout</a>
                </div>
                <div class="List__footer-row">
                    List icon made by <a href="http://www.freepik.com/">Freepik</a> from <a href="http://www.flaticon.com">www.flaticon.com</a>
                </div>
            </div>
        </v-footer>
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

            checkedItemsCount() {
                let result = 0;
                this.cart.map((el) => {
                    if (el.checked) { result++ }
                });
                
                return result;
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
        
        &__empty {
            margin-top: auto;
            margin-bottom: auto;
            text-align: center;
        }

        &__main {
            width: 100%;
            flex-grow: 1;
            padding: 75px 0 10px;
            overflow-x: hidden;
            display: flex;
        }

        &__items {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
        }
        
        &__counter {
            order: -1;
        }

        &__info {
            margin: 10px 0;
            display: flex;
            width: 100%;
            align-items: center;

            &:before {
                content: '';
                height: 1px;
                background-color: #ccc;
                flex-grow: 1;
                flex-shrink: 0;
                margin: 0 10px;
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
    }

</style>