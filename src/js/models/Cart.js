"use strict";
/************************************************************************ */
// src/ts/models/Cart.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cart = void 0;
class Cart {
    constructor() {
        this._items = new Map();
    }
    addItem(ci) {
        this._items.set(ci.id, ci);
    }
    hasItem(product_id) {
        return this._items.has(product_id);
    }
    removeItem(product_id) {
        if (this.hasItem(product_id)) {
            this._items.delete(product_id);
        }
    }
    getItem(prduct_id) {
        if (this.hasItem(prduct_id)) {
            return this._items.get(prduct_id);
        }
        return null;
    }
    totalItems() {
        let total = 0;
        for (let item of this._items.values()) {
            total += item.quantity;
        }
        return total;
    }
    getTotalCost() {
        let totalCost = 0;
        for (const item of this._items.values()) {
            totalCost += item.quantity * item.price;
        }
        return totalCost;
    }
}
exports.Cart = Cart;
//# sourceMappingURL=Cart.js.map