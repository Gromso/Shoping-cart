"use strict";
/*************************************************** */
// src/ts/components/ProductComponent.ts
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
exports.ProductComponent = void 0;
const AppState_1 = require("../AppState");
const nunjucks = __importStar(require("nunjucks"));
class ProductComponent {
    constructor(product) {
        this._product = product;
        this._element = document.createElement("div");
        this._element.innerHTML = nunjucks.render("product.tpl.html", { "product": this._product });
        this._btnAdd = this._element.querySelector(".cp-add-to-cart");
        this._btnAdd.onclick = () => {
            if (AppState_1.AppState.get().itemExistsInCart(this._product.id)) {
                AppState_1.AppState.get().inceaseQuantityForItem(this._product.id);
            }
            else {
                AppState_1.AppState.get().addItemToCart(this._product.toCartItem());
            }
        };
    }
    addTo(parent) {
        parent.appendChild(this._element);
    }
}
exports.ProductComponent = ProductComponent;
//# sourceMappingURL=ProductComponent.js.map