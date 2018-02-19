<template>
    <div class="list-item" v-bind:class="{'list-item--checked' : item.checked}">
        <div class="list-item__content is-size-4"  v-if="!isEdited" v-on:click="onToggle(item)">
            <span class="list-item__field">{{ item.name }}</span>
        </div>
        <div class="list-item__content" v-if="isEdited">
            <input class="input" type="text" v-model="item.name">
        </div>
        <div class="list-item__buttons">
            <button class="button is-success" v-on:click.stop="saveEdit()" v-if="isEdited">Сохранить</button>
            <button class="button is-info"
                    v-if="!isEdited && !item.checked"
                    v-on:click.stop="startEdit()">
                Изменить
            </button>
            <button class="button is-danger" v-if="!isEdited" v-on:click.stop="onRemove(item)">Удалить</button>
        </div>

    </div>
</template>

<script>
    export default {
        name: "list-item",
        props: ["item", "onRemove", "onToggle", "onChange"],
        data () {
            return {
                isEdited: false
            }
        },

        methods: {
            startEdit() {
                this.isEdited = true;
            },

            saveEdit() {
                this.onChange(this.item);
                this.isEdited = false;
            },
        }
    }
</script>

<style scoped>
    .list-item {
        display: flex;
        width: 100%;
        cursor: pointer;
        background-color: #f2f2f2;
    }

    .list-item .button {
        margin-left: 10px;
    }

    .list-item__buttons {
        align-self: center;
        padding-right: 15px;
    }

    .list-item__content {
        flex-grow: 1;
        align-self: center;
        padding: 15px;
    }

    .list-item__field {
        line-height: 21px;
        display: inline-block;
    }

    .list-item--checked {
        background-color: #f7f7f7;
    }

    .list-item--checked .list-item__field {
        text-decoration: line-through;
        opacity: 0.5;
    }

    @media (max-width: 768px) {
        .list-item {
            display: block;
        }

        .list-item__buttons {
            padding: 15px;
            border-top: 1px solid #dedede;
        }

        .list-item__buttons .button {
            margin: 0;
        }
    }
</style>