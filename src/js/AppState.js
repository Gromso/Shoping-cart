"use strict";
/******************************************************************************* */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppState = void 0;
const Cart_1 = require("./models/Cart");
class AppState {
    static get() {
        return this._instance;
    }
    constructor() {
        this._cart = new Cart_1.Cart();
        this._subscribers = new Map();
    }
    addItemToCart(item) {
        this._cart.addItem(item);
        this.notify("new_item", {
            "action": "item_added",
            "item": item
        });
    }
    inceaseQuantityForItem(item_id) {
        if (this._cart.hasItem(item_id)) {
            const item = this._cart.getItem(item_id);
            item.quantity++;
            this.notify("item_updated", {
                "action": "item_updated",
                "item_id": item_id
            });
        }
    }
    decreaseQuantityForItem(item_id) {
        if (this._cart.hasItem(item_id)) {
            const item = this._cart.getItem(item_id);
            item.quantity--;
            if (item.quantity == 0) {
                this._cart.removeItem(item_id);
                this.notify("item_removed", {
                    "action": "item_removed",
                    "item_id": item_id
                });
            }
            else {
                this.notify("item_updated", {
                    "action": "item_updated",
                    "item_id": item_id
                });
            }
        }
    }
    itemExistsInCart(item_id) {
        return this._cart.hasItem(item_id);
    }
    totalItems() {
        return this._cart.totalItems();
    }
    totalCost() {
        return this._cart.getTotalCost();
    }
    subscribe(subscribe, event_name) {
        var _a;
        if (!this._subscribers.has(event_name)) {
            this._subscribers.set(event_name, []);
        }
        (_a = this._subscribers.get(event_name)) === null || _a === void 0 ? void 0 : _a.push(subscribe);
    }
    notify(event_name, data) {
        if (!this._subscribers.has(event_name)) {
            return;
        }
        /*for(let subscribers of <Subscriber[]>this._subscribers.get(enent_name)){
            subscribers.update(data);
        }*/
        const subscribers = this._subscribers.get(event_name);
        if (subscribers) {
            for (let subscriber of subscribers) {
                subscriber.update(data);
            }
        }
    }
}
AppState._instance = new AppState();
exports.AppState = AppState;
//# sourceMappingURL=AppState.js.map