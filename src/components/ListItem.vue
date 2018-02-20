<template>
    <div class="list-item" v-bind:class="{'list-item--checked' : item.checked}">
        <label class="list-item__checkbox">
            <input type="checkbox" v-model="item.checked" @change="onChange(item)">
            <span></span>
        </label>
        <input type="text" class="list-item__input" v-model="item.name" @change="onChange(item)">
        <button class="list-item__button" @click="onRemove(item)"></button>
    </div>
</template>

<script>
    export default {
        name: "list-item",
        props: ["item", "onRemove", "onChange"],
        data () {
            return {
                isEdited: false
            }
        },

        methods: {

        }
    }
</script>

<style scoped>
    .list-item {
        display: flex;
        width: 100%;
        cursor: pointer;
        /*background-color: #f2f2f2;*/
    }

    .list-item .button {
        margin-left: 10px;
    }

    .list-item__input {
        flex-grow: 1;
        font-size: 18px;
        background-color: transparent;
        border: none;
        line-height: 45px;
        padding: 0 10px;
        font-family: Roboto, sans-serif;
        min-width: 100px;
    }

    .list-item__input:focus {
        outline: none;
    }

    .list-item__button {
        height: 45px;
        width: 45px;
        flex-shrink: 0;
        border: none;
        border-left: 1px solid #cccccc;
        cursor: pointer;
        background: transparent url("../../static/cross-out.svg") center no-repeat;
        background-size: 50%;
    }

    .list-item__button:focus {
        outline: none;
    }

    .list-item__checkbox {
        position: relative;
        display: flex;
        flex-direction: column;
        cursor: pointer;
    }
    .list-item__checkbox input {
        position: absolute;
        opacity: 0;
        width: 1px;
        height: 1px;
    }

    .list-item__checkbox span {
        content: '';
        display: inline-block;
        flex-grow: 1;
        width: 45px;
        height: 45px;
        border-right: 1px solid #ccc;
        background-size: 60%;
        background-repeat: no-repeat;
        background-position: center;
        background-image: url('../../static/not-checked.svg');
    }

    .list-item__checkbox input:checked + span {
        background-image: url('../../static/success.svg');

    }


    .list-item--checked .list-item__input {
        text-decoration: line-through;
        opacity: 0.5;
    }

</style>