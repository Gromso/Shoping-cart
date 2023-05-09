

   /****************************************** */
   import * as nunjucks from "nunjucks";
import { Product } from "./models/Product";
import { ProductComponent } from "./components/ProductComponent";
import { CartComponent } from "./components/CartComponent";
import { AppState } from "./AppState";
   nunjucks.configure("templates", {autoescape : true});


   const divProduct =<HTMLDivElement> document.querySelector("#products");
   const divCart = <HTMLLIElement>document.querySelector("#cart");
   const cartComponent = new CartComponent();
   AppState.get().subscribe(cartComponent,"new_item");
   AppState.get().subscribe(cartComponent,"item_updated");
   AppState.get().subscribe(cartComponent, "item_removed");

   cartComponent.addTo(divCart);




   fetch("https://fakestoreapi.com/products").then((response) => {
         response.json().then((data) => {
            for(let element of data){
                const p = new Product(element.id, element.title, element.price, element.description,
                                      element.category, element.image, element.rating);
                const comp = new ProductComponent(p)
                comp.addTo(divProduct);
               }
         });
    })

