export default class userSettings {

    constructor() {
        this.defaults = {
            showCheckedItems: true,
            showEditDate: true
        };
        
        this.STORAGE_KEY = 'shopping-list-settings';
    }
    
    fetch () {
        return JSON.parse(localStorage.getItem(this.STORAGE_KEY)) || this.defaults;
    }

    save (settings)  {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(settings))
    }
}