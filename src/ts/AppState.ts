   




   /******************************************************************************* */

import { Cart } from "./models/Cart";
import { CartItem } from "./models/Product";
import { Subscriber } from "./models/Subscriber";

   export class AppState{
    private _cart : Cart
    private _subscribers : Map<string, Subscriber[]> 
    private static _instance : AppState = new AppState();


    static get() : AppState{
        return this._instance;
    }

    private constructor() {
        this._cart = new Cart();
        this._subscribers = new Map();
    }


    addItemToCart(item : CartItem){
        this._cart.addItem(item);
        this.notify("new_item", {
            "action": "item_added",
            "item" : item
        })
    }


    inceaseQuantityForItem(item_id : number){
        if(this._cart.hasItem(item_id)){
            const item = <CartItem>this._cart.getItem(item_id);
            item.quantity++;
            this.notify("item_updated", {
                "action": "item_updated",
                "item_id": item_id
            });
        }
    }

    decreaseQuantityForItem(item_id : number){
        if(this._cart.hasItem(item_id)){
            const item = <CartItem>this._cart.getItem(item_id);
            item.quantity--;
           if(item.quantity == 0){
            this._cart.removeItem(item_id);
            this.notify("item_removed", {
                "action": "item_removed",
                "item_id": item_id
            })
           }else{
            this.notify("item_updated", {
                "action": "item_updated",
                "item_id": item_id
            });
           }
          
        }
    }

  
    itemExistsInCart(item_id : number) : boolean{
        return this._cart.hasItem(item_id);
    }

    totalItems(){
        return this._cart.totalItems();
    }
    totalCost(){
        return this._cart.getTotalCost()
    }


    subscribe(subscribe : Subscriber, event_name : string){
        if(!this._subscribers.has(event_name)){
         this._subscribers.set(event_name, []);
        }
        this._subscribers.get(event_name)?.push(subscribe);
    }


    notify(event_name : string, data : any){
        if(!this._subscribers.has(event_name)){
            return;
        }
        /*for(let subscribers of <Subscriber[]>this._subscribers.get(enent_name)){
            subscribers.update(data);
        }*/
        const subscribers = this._subscribers.get(event_name);
        if (subscribers) {
            for (let subscriber of subscribers) {
                subscriber.update(data);
            }
        }
    }

}

