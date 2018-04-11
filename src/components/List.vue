<template>
    <div class="List">
        <ListForm v-if="loaded" :on-add-item="addItem" />
        
        <div class="List__main">
            <div class="List__items List__wrapper">
                
                <div v-if="!loaded" class="List__empty display-2">
                    <v-progress-circular indeterminate size="96" color="red"/>
                </div>
                
                <div v-if="listIsEmpty" class="List__empty display-2">
                    Пока здесь пусто.
                </div>
                
                <div class="List__info" v-if="cart.length !== 0">
                    
                    <div class="List__counter title">
                        {{ checkedItemsCount }}/{{cart.length }}
                    </div>
                    
                    <v-btn v-if="checkedItemsCount"  @click.prevent="toggleSetting('showCheckedItems')" icon>
                        <v-icon>{{!settings.showCheckedItems ? 'visibility' : 'visibility_off'}}</v-icon>
                    </v-btn>

                    <v-btn @click.prevent="toggleSetting('showEditDate')" icon>
                        <v-icon>{{!settings.showEditDate ? 'event_note' : 'event_busy'}}</v-icon>
                    </v-btn>
                    
                    <v-btn v-if="checkedItemsCount"  @click.prevent="removeCheckedItems(cart)" icon>
                        <v-icon>delete</v-icon>
                    </v-btn>
                </div>
                
                <transition-group name="flip-list">
                    <list-item 
                        v-for="item in sortedCart"
                        v-show="!(item.checked && !settings.showCheckedItems)"
                        :key="item['.key']" 
                        :item="item"
                        :show-date="settings.showEditDate"
                        :on-remove="removeItem" 
                        :on-change="changeItem"
                        :user="user"
                    />
                </transition-group>
            </div>
        </div>
    </div>
</template>

<script>
    import ListItem from './ListItem'
    import ListForm from './ListForm'
    import { cartRef } from '../firebaseSetup'
    import firebase from 'firebase'
    
    const STORAGE_KEY = 'shopping-list-settings';
    
    let defaults = {
        showCheckedItems: true,
        showEditDate: true
    };
    
    let settingsStorage = {
        
        fetch: () => {
            return JSON.parse(localStorage.getItem(STORAGE_KEY)) || defaults;
        },
        
        save: (settings) => {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
        }
    };

    export default {
        name: "List",
        components: {
            ListItem,
            ListForm
        },

        firebase: {
            
            cart: {
                source: cartRef,
                readyCallback: function () {
                    this.loaded = true;
                    this.user = firebase.auth().currentUser.email;
                }
            }
            
        },

        data () {
            return {
                showForm: true,
                loaded: false,
                user: null,
                settings: settingsStorage.fetch()
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
            
            listIsEmpty() {
                return this.cart.length === 0 && this.loaded
            },
        },

        methods: {
            addItem(str) {
                if (str !== '') {
                    let date = Date.now();
                    let items = str.split(',');
                    items.map((el) => {
                        if (el.trim() !== '' ) {
                            cartRef.push({
                                checked: false,
                                name: el.trim(),
                                date: date,
                            });
                        }

                    });
                }
            },
            
            toggleSetting(key) {
                this.settings[key] = !this.settings[key];
                settingsStorage.save(this.settings);
            },

            removeItem(item) {
                cartRef.child(item['.key']).remove()
            },

            removeCheckedItems(array) {
                let toDelete = array.filter((el) => el.checked);
                toDelete.map((el) => { this.removeItem(el) });
            },

            changeItem(item, keepDate) {
                const copy = {...item};
                delete copy['.key'];
                if (!keepDate) {
                    copy.editDate = Date.now();
                }
                cartRef.child(item['.key']).set(copy);
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
        flex-grow: 1;

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
    }

</style>