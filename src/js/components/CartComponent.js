"use strict";
/************************************************ */
// src/ts/components/CartComponent 
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
exports.CartComponent = void 0;
const AppState_1 = require("../AppState");
const CartItemComponent_1 = require("./CartItemComponent");
const nunjucks = __importStar(require("nunjucks"));
class CartComponent {
    constructor() {
        this._items = new Map();
        this._element = document.createElement("div");
        this._element.innerHTML = nunjucks.render("cart.tpl.html");
        this._spanElemntCount = this._element.querySelector(".cp-item-count");
        this._UlItemList = this._element.querySelector(".cp-item-list");
        console.log(this._UlItemList);
        this._btnViewCart = this._element.querySelector(".cp-cart-toggle");
        this._divItemDropDown = this._element.querySelector(".cp-cart-items");
        this._dropDownState = false;
        this._bTotalCost = this._element.querySelector(".cp-total-cost");
        this._btnViewCart.onclick = () => {
            this._divItemDropDown.style.display =
                this._dropDownState ? "none" : "block";
            this._dropDownState = !this._dropDownState;
        };
    }
    addTo(parent) {
        parent.appendChild(this._element);
    }
    update(data) {
        if (data.action == "item_added") {
            const comp = new CartItemComponent_1.CartItemComponent(data.item);
            this._items.set(data.item.id, comp);
            comp.addTo(this._UlItemList);
        }
        else if (data.action == "item_updated") {
            const comp = this._items.get(data.item_id);
            comp.updateInputQuantity();
        }
        else if (data.action == "item_removed") {
            const comp = this._items.get(data.item_id);
            comp.removeElement();
            this._items.delete(data.item_id);
        }
        this._spanElemntCount.innerHTML = String(AppState_1.AppState.get().totalItems());
        this._bTotalCost.innerHTML = AppState_1.AppState.get().totalCost().toFixed(2);
    }
}
exports.CartComponent = CartComponent;
//# sourceMappingURL=CartComponent.js.map