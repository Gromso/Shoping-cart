

   /************************************************************************ */
   // src/ts/models/Cart.ts

import { CartItem } from "./Product";





   export class Cart{
    private _items : Map<number, CartItem>


    constructor(){
        this._items = new Map();
    }



    addItem(ci : CartItem){
        this._items.set(ci.id, ci);
    }

    hasItem(product_id : number) : boolean{
      return  this._items.has(product_id);
    }

    removeItem(product_id : number){
        if(this.hasItem(product_id)){
            this._items.delete(product_id);
        }
    }

    getItem(prduct_id : number) : CartItem|null{
        if(this.hasItem(prduct_id)){
            return <CartItem> this._items.get(prduct_id);
        }
        return null;
    }

    totalItems() : number {
        let total = 0;
        for(let item of this._items.values()){
            total +=item.quantity;
        }
        return total;
    }

    getTotalCost(): number {
        let totalCost = 0;
        
        for (const item of this._items.values()) {
          totalCost += item.quantity * item.price;
        }
    
        return totalCost;
      }


   }