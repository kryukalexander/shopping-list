<template>
    <v-toolbar :color="'error'" :fixed="true" :height="64">
        <div class="list-form">
            <v-text-field
                    solo
                    flat
                    placeholder="Название"
                    v-model="newString"
                    @keyup.enter="handleAddItem()"
                    :autofocus="true"
                    :hide-details="true"
            />

            <v-btn icon dark v-on:click="handleAddItem()"><v-icon>add</v-icon></v-btn>
        </div>
    </v-toolbar>
</template>

<script>
    export default {
        name: "list-form",
        props: ["onAddItem"],
        
        data() {
            return {
                newString: ''
            }
        },
        
        methods: {
            handleAddItem () {
                this.onAddItem(this.newString);
                this.newString = null;
            }
        } 
    }
</script>

<style scoped>
    .list-form {
        width: 100%;
        max-width: 1000px;
        padding: 0 10px;
        margin: 0 auto;
        display: flex;
    }
</style>