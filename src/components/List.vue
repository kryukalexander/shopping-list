<template>
    <div class="shopping-list">

        <div class="shopping-list__form">
            <input type="text" v-model="newItem.name">
            <input type="number" v-model="newItem.count">
            <select name="" id="" v-model="newItem.units">
                <option>pieces</option>
                <option>kg</option>
                <option>l</option>
            </select>
            <button v-on:click="addItem(newItem)">Add</button>
            <button v-on:click="clearSelected()">Clear selected</button>
        </div>

        <!--<div v-if="recentItems.length > 0" class="shopping-list__recent">-->
            <!--<div class="shopping-list__recent-item" v-for="item in recentItems" v-on:click="selectRecent(item)">{{item}}</div>-->
        <!--</div>-->

        <div class="shopping-list__item" v-for="item in items" v-bind:class="{'shopping-list__item--selected' : item.selected}">
            <list-item v-bind:item="item" v-bind:on-remove="removeItem"/>
        </div>

        <div v-if="hasSelectedItems()" class="shopping-list__divider"></div>
    </div>
</template>

<script>
    import ListItem from './ListItem'

    export default {
        name: "List",
        components: {
          ListItem
        },
        data () {
            return {
                items: [
                    { name: 'Fruits', selected: false },
                    { name: 'Milk', selected: false },
                    { name: 'Bananas', selected: false },
                ],

                newItem: {
                    name: '',
                    count: '',
                    units: ''
                },
                recentItems: [],
            }
        },

        methods: {
            addItem(newItem) {
                if (newItem.name !== '') {
                    let i = {};
                    for (const key in newItem) {
                        if (newItem[key] !== '') {
                            i[key] = newItem[key];
                            newItem[key] = ''
                        }
                    }

                    this.items.push(i);

                    if ( this.recentItems.indexOf(name) < 0 ) {
                        this.recentItems.push(name);
                    }
                }

                newItem = {
                    name: '',
                    count: '',
                    units: ''
                };
            },

            hasSelectedItems(){
                let result = 0;
                this.items.map((item) => {
                    if (item.selected) { result ++}
                });
                return result > 0
            },

            removeItem(item) {
                let index = this.items.indexOf(item);
                this.items.splice(index, 1)
            },

            clearSelected() {
                this.items = this.items.filter((item) => !item.selected)
            },

            selectRecent(name) {
                this.newName = name;
            }
        }
    }
</script>

<style scoped>
    .shopping-list {
        display: flex;
        flex-direction: column;
    }

    .shopping-list__item--selected {
        opacity: 0.5;
        order: 3;
    }

    .shopping-list__divider {
        height: 1px;
        width: 100%;
        background-color: #ccc;
        order: 2;
        margin: 10px 0;
    }

    .shopping-list__form {
        position: relative;
        margin-bottom: 20px;
    }

    .shopping-list__item {
        margin-bottom: 5px;
    }

    .shopping-list__recent {
        background-color: white;
        box-shadow: 0 0 2px 1px gray;
        padding: 5px 0;
        border-radius: 4px;
        left: 0;
        top: 100%;
        margin: 10px 0;
    }

    .shopping-list__recent-item {
        padding: 5px 10px;
        cursor: pointer;
    }

    .shopping-list__recent-item:hover {
        background-color: #f1f1f1;
    }

</style>