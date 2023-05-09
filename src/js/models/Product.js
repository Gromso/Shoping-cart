"use strict";
/*********************************************** */
// src/ts/models/Product.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartItem = exports.Product = void 0;
class Product {
    constructor(id, title, price, description, category, image, rating) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.description = description;
        this.category = category;
        this.image = image;
        this.rating = rating;
    }
    priceFormatted() {
        return this.price.toFixed(2);
    }
    toCartItem() {
        return new CartItem(this.id, this.title, this.price, this.description, this.category, this.image, this.rating);
    }
}
exports.Product = Product;
class CartItem extends Product {
    constructor(id, title, price, description, category, image, rating) {
        super(id, title, price, description, category, image, rating);
        this.quantity = 1;
    }
    priceFormatted() {
        return (this.price * this.quantity).toFixed(2);
    }
}
exports.CartItem = CartItem;
//# sourceMappingURL=Product.js.map