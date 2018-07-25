<template>
    <div class="List">
        <ListForm v-if="loaded" :on-add-item="addItem" />
        
        <main class="List__main">
            <div class="List__items List__wrapper">
                
                <div v-if="!loaded" class="List__empty display-2">
                    <v-progress-circular indeterminate size="96" color="red"/>
                </div>
                
                <div v-if="listIsEmpty" class="List__empty display-2">
                    Пока здесь пусто.
                </div>
                
                <transition-group name="flip-list">
                    <div class="List__info" v-if="cart.length !== 0" :key="'listHeading'">

                        <div class="List__counter title">
                            {{ checkedItems.length }}/{{cart.length }}
                        </div>

                        <v-btn 
                           @click.prevent="toggleSetting('showEditDate')"
                           title="Toggle date visibility"
                           aria-label="Toggle date visibility"
                           icon
                        >
                            <v-icon>{{!settings.showEditDate ? 'event_note' : 'event_busy'}}</v-icon>
                        </v-btn>

                        <v-btn
                                aria-label="Delete all items"
                                title="Delete all items"
                                @click.prevent="removeItems(cart)"
                                icon
                        >
                            <v-icon>delete</v-icon>
                        </v-btn>

                    </div>
                    
                    <list-item 
                        v-for="item in sortedCart"
                        :key="item['.key']" 
                        :item="item"
                        :on-remove="removeItem" 
                        :on-change="changeItem"
                    />
                    
                    <div class="List__info" v-if="lowPriorityItems.length" :key="'lowPriorityToggle'">
                        <div class="List__counter title">
                            Низкий приоритет ({{ lowPriorityItems.length }})
                        </div>
                        <v-btn 
                           title="Toggle checked items visibility"
                           aria-label="Toggle checked items visibility"
                           @click.prevent="toggleSetting('showLowPriorityItems')" icon
                        >
                            <v-icon>{{!settings.showLowPriorityItems ? 'visibility' : 'visibility_off'}}</v-icon>
                        </v-btn>
                        <v-btn
                            aria-label="Delete low priority items"
                            title="Delete low priority items"
                            @click.prevent="removeItems(lowPriorityItems)"
                            icon
                        >
                            <v-icon>delete</v-icon>
                        </v-btn>
                    </div>
                    
                    <list-item
                        v-for="item in lowPriorityItems"
                        :key="item['.key']"
                        :item="item"
                        :on-remove="removeItem"
                        :on-change="changeItem"
                        v-show="settings.showLowPriorityItems"
                    />
                    
                    <div class="List__info" v-if="checkedItems.length" :key="'checkedToggle'">
                        <div class="List__counter title">
                            Отмеченные ({{ checkedItems.length }})
                        </div>
                        <v-btn 
                           title="Toggle checked items visibility"
                           aria-label="Toggle checked items visibility"
                           @click.prevent="toggleSetting('showCheckedItems')" 
                           icon
                        >
                            <v-icon>{{!settings.showCheckedItems ? 'visibility' : 'visibility_off'}}</v-icon>
                        </v-btn>

                        <v-btn
                            aria-label="Delete checked items"
                            title="Delete checked items"
                            @click.prevent="removeItems(checkedItems)"
                            icon
                        >
                            <v-icon>delete</v-icon>
                        </v-btn>
                    </div>
                    
                    <list-item
                        v-for="item in checkedItems"
                        :key="item['.key']"
                        :item="item"
                        :on-remove="removeItem"
                        :on-change="changeItem"
                        v-show="settings.showCheckedItems"
                    />
                </transition-group>
            </div>
        </main>
    </div>
</template>

<script>
    import ListItem from './ListItem'
    import ListForm from './ListForm'
    import { cartRef } from '../setup/firebaseSetup'
    
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
                }
            }
            
        },

        data () {
            return {
                showForm: true,
                loaded: false,
            }
        },

        computed: {
            sortedCart() {
                const sorted = this.cart.filter( (el) => !el.checked && !el.lowPriority );
                return sorted.reverse();
            },
            
            checkedItems() {
                return this.cart.filter( el => el.checked);
            },
            
            lowPriorityItems() {
                return this.cart.filter( el => el.lowPriority && !el.checked);
            },
            
            listIsEmpty() {
                return this.cart.length === 0 && this.loaded
            },
            
            settings() {
                return this.$store.state.settings;
            } 
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
                                lowPriority: false
                            });
                        }

                    });
                }
            },
            
            toggleSetting(key) {
                this.$store.commit('toggleSetting', key)
            },

            removeItem(item) {
                cartRef.child(item['.key']).remove()
            },
            
            removeItems(array){
                const toDelete = [...array];
                toDelete.map((el) => { return this.removeItem(el) });  
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
        transform-origin: top center;
        transform: scaleY(0);
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