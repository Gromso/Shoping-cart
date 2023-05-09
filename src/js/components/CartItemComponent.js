"use strict";
/******************************************** */
// src/ts/components/CartItemComponent.ts
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartItemComponent = void 0;
const AppState_1 = require("../AppState");
const nunjucks = __importStar(require("nunjucks"));
class CartItemComponent {
    constructor(item) {
        this._item = item;
        this._element = document.createElement("li");
        this._element.innerHTML = nunjucks.render("cart-item.tpl.html", { "item": item });
        this._inputQuantity = this._element.querySelector(".cp-quantity");
        this._btnIncrease = this._element.querySelector(".cp-increase");
        this._divItemPrice = this._element.querySelector(".cart-item-price");
        this._btnIncrease.onclick = () => {
            AppState_1.AppState.get().inceaseQuantityForItem(this._item.id);
        };
        this._btnDecrease = this._element.querySelector(".cp-decrease");
        this._btnDecrease.onclick = () => {
            AppState_1.AppState.get().decreaseQuantityForItem(this._item.id);
        };
    }
    updateInputQuantity() {
        this._inputQuantity.value = String(this._item.quantity);
        this._divItemPrice.innerHTML = this._item.priceFormatted();
    }
    addTo(parent) {
        console.log(parent, this._element);
        parent.append(this._element);
    }
    removeElement() {
        this._element.remove();
    }
}
exports.CartItemComponent = CartItemComponent;
//# sourceMappingURL=CartItemComponent.js.map