"use strict";
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
/****************************************** */
const nunjucks = __importStar(require("nunjucks"));
const Product_1 = require("./models/Product");
const ProductComponent_1 = require("./components/ProductComponent");
const CartComponent_1 = require("./components/CartComponent");
const AppState_1 = require("./AppState");
nunjucks.configure("templates", { autoescape: true });
const divProduct = document.querySelector("#products");
const divCart = document.querySelector("#cart");
const cartComponent = new CartComponent_1.CartComponent();
AppState_1.AppState.get().subscribe(cartComponent, "new_item");
AppState_1.AppState.get().subscribe(cartComponent, "item_updated");
AppState_1.AppState.get().subscribe(cartComponent, "item_removed");
cartComponent.addTo(divCart);
fetch("https://fakestoreapi.com/products").then((response) => {
    response.json().then((data) => {
        for (let element of data) {
            const p = new Product_1.Product(element.id, element.title, element.price, element.description, element.category, element.image, element.rating);
            const comp = new ProductComponent_1.ProductComponent(p);
            comp.addTo(divProduct);
        }
    });
});
//# sourceMappingURL=app.js.map