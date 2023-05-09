

   /*************************************************** */
   // src/ts/components/ProductComponent.ts

import { AppState } from "../AppState";
import { Product } from "../models/Product";
import * as nunjucks from "nunjucks";



   export class ProductComponent{
      private _product : Product;
      private _element : HTMLElement;
      private _btnAdd : HTMLButtonElement;

      constructor(product : Product){
         this._product = product;
         this._element = <HTMLDivElement>document.createElement("div");
         this._element.innerHTML = nunjucks.render("product.tpl.html",
                                  {"product": this._product});
         this._btnAdd = <HTMLButtonElement>this._element.querySelector(".cp-add-to-cart");
         this._btnAdd.onclick = () =>{

            if(AppState.get().itemExistsInCart(this._product.id)){
               AppState.get().inceaseQuantityForItem(this._product.id);

            }else{
               AppState.get().addItemToCart(
                  this._product.toCartItem()
               );
               }
         }
      }


      public addTo(parent : HTMLElement){
         parent.appendChild(this._element);
      }



   }