import {makeAutoObservable} from "mobx";

export default class UserStore {
    constructor(props) {
        this._isActive = false
        this._items = []
        makeAutoObservable(this)
    }

    setIsActive(bool) {
        this._isAuth = bool
    }

    addItem(item) {
        this._items.push(item)
    }

    deleteUser(id) {
        this._items.filter(item => item.id !== id)
    }

    get items() {
        return this._items
    }

    get isActive() {
        return this._isActive
    }
}