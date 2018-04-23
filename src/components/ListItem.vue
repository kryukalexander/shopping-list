<template>
    <v-card 
        class="list-item mb-2" 
        :class="{'list-item--checked' : item.checked}" 
        :color="item.checked ? 'grey lighten-2' : 'white'"
    >
        <label class="list-item__checkbox">
            <input 
                type="checkbox" 
                v-model="item.checked" 
                @change="onChange(item, true)"
                :disabled="isEditedByAnotherUser(item)"
                tabindex="0"
            />
            
            <v-icon>{{ item.checked ? 'check_box' : 'check_box_outline_blank'}}</v-icon>
        </label>

        <div v-if="isEditedByAnotherUser(item)" class="list-item__blocker">
            <v-icon>{{ 'not_interested' }}</v-icon>
        </div>

        <div class="list-item__info">
            
            <input 
                type="text" 
                class="list-item__input" 
                v-model="item.name"
                :disabled="isEditedByAnotherUser(item)"
                @focus="handleFocus(item)"
                @blur="handleChange(item)"
                @change="handleChange(item)"
            />
            
            <div class="list-item__date" v-if="settings.showEditDate">{{parseDate}}</div>
        </div>
        
        <div class="list-item__button">
            <v-btn @click="onRemove(item)"
                   :disabled="isEditedByAnotherUser(item)"
                   flat icon large>
                <v-icon>clear</v-icon>
            </v-btn>
        </div>
    </v-card>
</template>

<script>
    export default {
        name: "list-item",
        props: ["item", "onRemove", "onChange"],
        data () {
            return {
                isEdited: false,
                oldFieldValue: '',
            }
        },
        
        methods: {
            handleFocus(item){
              this.oldFieldValue = item.name;
              item.editPerson = this.username;
              this.onChange(item, true);
            },

            handleChange(item){
                let keepDate = this.oldFieldValue.trim() === item.name;
                item.editPerson = null;
                this.oldFieldValue = '';
                this.onChange(item, keepDate);
            },
            
            isEditedByAnotherUser(item) {
                return item.editPerson && (item.editPerson !== this.username);
            }
        },

        computed: {
            parseDate() {
                let status = !this.item.editDate ? 'Добавлено' : 'Изменено';
                let date = !this.item.editDate ? this.item.date : this.item.editDate;
                let dateToParse = new Date(date);
                return status + ' ' + dateToParse.toLocaleString();
            },
            
            settings() {
                return this.$store.state.settings
            },
            
            username() {
                return this.$store.state.userMail
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

        &__info {
            flex-grow: 1;
            position: relative;
        }

        &__date {
            position: absolute;
            right: 0;
            top: 0;
            font-size: 11px;
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
            }
            
            &:disabled {
               opacity: 0.5;
            }
        }
        
        &__checkbox {
            flex-shrink: 0;
            flex-grow: 0;
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding: 0 10px 0 10px;
            
            input[type=checkbox] {
                display: none;
            }
            
            > * {
                cursor: pointer;
            }
        }

        &__button {
            flex-shrink: 0;
        }

        &--checked {
            .list-item__input {
                text-decoration: line-through;
                opacity: 0.25;
            }
        }
    }

</style>