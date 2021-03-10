class LocalStorageService {
    //get item
    getItem = (key, type = 'string') => {
        let value = window.localStorage.getItem(key)
        return type === 'object' ? JSON.parse(value) : value;
    }

    //set item
    setItem = (key, value) => {
        if (typeof value === 'string') {
            window.localStorage.setItem(key, value)
        } else {
            window.localStorage.setItem(key, JSON.stringify(value))
        }
    }

    //clear item
    cleanItem = (key) => {
        window.localStorage.removeItem(key)
    }

    //clear all item
    cleanAll = () => {
        window.localStorage.clean()
    }
}

export default new LocalStorageService()