
  


   /************************************************ */
   // src/ts/components/CartComponent 

import { AppState } from "../AppState";
import { CartItem } from "../models/Product";
import { Subscriber } from "../models/Subscriber";
import { CartItemComponent } from "./CartItemComponent"
import * as nunjucks from "nunjucks";


   export class CartComponent implements Subscriber{
    private _element : HTMLElement;
    private _items : Map<number, CartItemComponent>;
    private _spanElemntCount : HTMLSpanElement;
    private _UlItemList : HTMLUListElement;
    private _btnViewCart : HTMLButtonElement;
    private _divItemDropDown : HTMLDivElement;
    private _dropDownState : boolean;
    private _bTotalCost : HTMLElement;

    constructor(){
        this._items = new Map();
        this._element = <HTMLDivElement>document.createElement("div");
        this._element.innerHTML = nunjucks.render("cart.tpl.html");
        
        this._spanElemntCount =<HTMLSpanElement>this._element.querySelector(".cp-item-count");
        this._UlItemList = <HTMLUListElement>this._element.querySelector(".cp-item-list");
        console.log(this._UlItemList)
        this._btnViewCart = <HTMLButtonElement>this._element.querySelector(".cp-cart-toggle");
        this._divItemDropDown = <HTMLDivElement>this._element.querySelector(".cp-cart-items");
        this._dropDownState = false;
        this._bTotalCost = <HTMLElement>this._element.querySelector(".cp-total-cost");

        this._btnViewCart.onclick = () =>{
         this._divItemDropDown.style.display = 
         this._dropDownState ? "none" : "block";
         this._dropDownState = !this._dropDownState;
            
        }
    }

    addTo(parent : HTMLElement){
        parent.appendChild(this._element);
    }

    update(data: any): void {
        if(data.action == "item_added"){
            const comp = new CartItemComponent(data.item);
            this._items.set(data.item.id, comp);
            comp.addTo(this._UlItemList);
        }else if(data.action == "item_updated"){
            const comp =<CartItemComponent> this._items.get(data.item_id)
            comp.updateInputQuantity();
        }else if(data.action == "item_removed"){
            const comp = <CartItemComponent>this._items.get(data.item_id);
            comp.removeElement();
            this._items.delete(data.item_id);
        }
        this._spanElemntCount.innerHTML = String (
            AppState.get().totalItems()
        )

        this._bTotalCost.innerHTML = AppState.get().totalCost().toFixed(2)
        

    }




   }