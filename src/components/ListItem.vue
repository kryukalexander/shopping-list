<template>
    <div class="list-item" v-bind:class="{'list-item--checked' : item.checked}">
        <span class="list-item__name">{{ item.name }}</span>
        <button class="list-item__button">Edit</button>
        <button class="list-item__button" v-on:click.stop="onRemove(item)">Delete</button>
    </div>
</template>

<script>
    export default {
        name: "list-item",
        props: ["item", "onRemove"],
    }
</script>

<style scoped>
    .list-item {
        background-color: #f1f1f1;
        display: flex;
        width: 100%;
        cursor: pointer;
    }

    .list-item__name {
        flex-grow: 1;
        padding: 15px;
    }

    .list-item--checked .list-item__name {
        text-decoration: line-through;
    }

    .list-item__button {
        flex-grow: 0;
        flex-shrink: 0;
    }

    .list-item--checked {
        opacity: 0.5;
        transition-duration: .25s;
    }
</style>