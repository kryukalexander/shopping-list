export default class storageAPI {

    constructor(defaults, key) {
        this.defaults = defaults;
        this.STORAGE_KEY = key;
    }
    
    fetch () {
        return JSON.parse(localStorage.getItem(this.STORAGE_KEY)) || this.defaults;
    }

    save (settings)  {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(settings))
    }
}