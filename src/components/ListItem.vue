<template>
    <div class="list-item">
        <input type="checkbox" v-model="item.selected">
        <span>{{ item.name }}</span>
        <span v-if="item.count">{{item.count }}</span>
        <span v-if="item.units">{{item.units }}</span>
        <button v-on:click="onRemove(item)">X</button>
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
        padding: 5px;
    }
</style>