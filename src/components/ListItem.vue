<template>
    <div class="list-item" :class="{'list-item--checked' : item.checked}">
        <label class="list-item__checkbox">
            <input type="checkbox" v-model="item.checked" @change="onChange(item, true)" tabindex="0">
            <span></span>
        </label>
        
        <!--todo fix the onChange issue-->

        <!--<div class="list-item__checkbox">-->
            <!--<v-checkbox-->
                <!--hide-details-->
                <!--v-model="item.checked"-->
                <!--v-on:change="onChange(item, true)"-->
            <!--/>-->
        <!--</div>-->

        <div class="list-item__info">
            <input type="text" class="list-item__input" v-model="item.name" @change="onChange(item)">
            <div class="list-item__date">{{parseDate}}</div>
        </div>
        <div class="list-item__button">
            <v-btn @click="onRemove(item)" flat icon large><v-icon>clear</v-icon></v-btn>
        </div>

        <!--<button class="list-item__button" @click="onRemove(item)"></button>-->
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

        computed: {
            parseDate() {
                let status = !this.item.editDate ? 'Добавлено' : 'Изменено';
                let date = !this.item.editDate ? this.item.date : this.item.editDate;
                let dateToParse = new Date(date);
                let calendar = dateToParse.toLocaleDateString();
                let hours = (dateToParse.getHours() + '').padStart(2, '0');
                let minutes = (dateToParse.getMinutes() + '').padStart(2, '0');
                return `${status} ${calendar}, ${hours}:${minutes}`;
            }
        }
    }
</script>

<style lang="scss" scoped>

    .list-item {
        display: flex;
        align-items: center;
        width: 100%;
        cursor: pointer;
        background-color: #ffffff;
        box-shadow: 1px 1px 4px 0 rgba(0, 0, 0, 0.25);

        &__info {
            flex-grow: 1;
            position: relative;
        }

        &__date {
            position: absolute;
            right: 10px;
            top: 2px;
            font-size: 12px;
            font-style: italic;
            color: #aaa;
        }

        &__input {
            display: block;
            width: 100%;
            font-size: 18px;
            background-color: transparent;
            border: none;
            line-height: 25px;
            padding: 15px 10px;
            font-family: Roboto, sans-serif;
            min-width: 100px;

            &:focus {
                outline: none;
                background-color: #f2f2f2;
            }

            @media (max-width: 480px) {
                padding: 20px 10px 5px;
            }
        }
        
        &__checkbox {
            flex-shrink: 0;
            flex-grow: 0;
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding: 0 10px 0 10px;
        }

        &__button {
            flex-shrink: 0;
        }

        &--checked {
            .list-item__input {
                text-decoration: line-through;
                opacity: 0.25;
            }

            background-color: #f5f5f5;
        }
    }

</style>