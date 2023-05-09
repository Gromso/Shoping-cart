  


   /******************************************** */
   // src/ts/components/CartItemComponent.ts

import { AppState } from "../AppState";
import { CartItem } from "../models/Product";
import * as nunjucks from "nunjucks";

   export class CartItemComponent{
    private _item : CartItem;
    private _element : HTMLElement;
    private _inputQuantity : HTMLInputElement;
    private _btnIncrease : HTMLButtonElement;
    private _btnDecrease : HTMLButtonElement;
    private _divItemPrice : HTMLDivElement;



    constructor(item : CartItem){
        this._item = item;
        this._element = <HTMLLIElement>document.createElement("li");
        this._element.innerHTML = nunjucks.render("cart-item.tpl.html",
          {"item" : item});
          this._inputQuantity = <HTMLInputElement>this._element.querySelector(".cp-quantity");
          this._btnIncrease = <HTMLButtonElement>this._element.querySelector(".cp-increase");
          this._divItemPrice = <HTMLDivElement>this._element.querySelector(".cart-item-price");
          this._btnIncrease.onclick = () =>{
            AppState.get().inceaseQuantityForItem(this._item.id);

          }
          this._btnDecrease = <HTMLButtonElement>this._element.querySelector(".cp-decrease");
          this._btnDecrease.onclick = () =>{
            AppState.get().decreaseQuantityForItem(this._item.id);
          }
    }

    updateInputQuantity(){
        this._inputQuantity.value = String(this._item.quantity);
        this._divItemPrice.innerHTML = this._item.priceFormatted();
     }


    addTo(parent : HTMLElement){
        console.log(parent, this._element)
        parent.append(this._element);
    }
    
    removeElement(){
      this._element.remove();
    }

   }