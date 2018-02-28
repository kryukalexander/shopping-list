<template>
    <div class="list-item" :class="{'list-item--checked' : item.checked}">
        <label class="list-item__checkbox">
            <input type="checkbox" v-model="item.checked" @change="onChange(item)" tabindex="0">
            <span></span>
        </label>
        <div class="list-item__info">
            <input type="text" class="list-item__input" v-model="item.name" @change="onChange(item)">
            <div class="list-item__date" v-if="!item.editDate">Добавлено {{parseDate(item.date) }} </div>
            <div class="list-item__date" v-if="item.editDate">Изменено {{parseDate(item.editDate)}} </div>
        </div>

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
            parseDate(date) {
                let dateToParse = new Date(date);
                let calendar = dateToParse.toLocaleDateString();
                let hours = (dateToParse.getHours() + '').padStart(2, '0');
                let minutes = (dateToParse.getMinutes() + '').padStart(2, '0');
                return `${calendar}, ${hours}:${minutes}`;
            }
        }
    }
</script>

<style lang="scss" scoped>

    .list-item {
        display: flex;
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

        &__button {
            width: 45px;
            flex-shrink: 0;
            border: none;
            border-left: 1px solid #cccccc;
            cursor: pointer;
            background: transparent url("../../static/cross-out.svg") center no-repeat;
            background-size: 50%;

            &:focus {
                outline: none;
                background-color: #f2f2f2;
            }
        }

        &__checkbox {
            position: relative;
            display: flex;
            flex-direction: column;
            cursor: pointer;


            input {
                position: absolute;
                opacity: 0;
                width: 1px;
                height: 1px;
            }

            span {
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

            input:checked + span {
                background-image: url('../../static/success.svg');
            }

            input:focus + span {
                background-color: #f2f2f2;
            }

        }

        &--checked {
            .list-item__input {
                text-decoration: line-through;
                opacity: 0.5;
            }
        }
    }





</style>