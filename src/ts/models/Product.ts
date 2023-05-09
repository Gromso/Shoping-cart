

   /*********************************************** */
   // src/ts/models/Product.ts


   export class Product{
    public id: number;
    public title: string;
    public price : number;
    public description : string;
    public category : string;
    public image : string;
    public rating : {
        rate : number,
        count : number
    }

    constructor(id : number, title : string, price : number,
        description : string, category : string, image : string,
        rating : {rate : number , count : number}){
            this.id = id;
            this.title = title;
            this.price = price;
            this.description = description;
            this.category = category;
            this.image = image;
            this.rating = rating;
        }


        priceFormatted() {
            return  this.price.toFixed(2);
        }

        toCartItem() : CartItem {
            return new CartItem(
                this.id,
                this.title,
                this.price,
                this.description,
                this.category,
                this.image,
                this.rating
            )
        }
   }



   export class CartItem extends Product{
     public quantity : number;



     constructor(id : number, title : string, price : number,
        description : string, category : string, image : string,
        rating : {rate : number , count : number}){
        super(id,title, price, description, category, image, rating);
        this.quantity = 1;
     }

     priceFormatted(): string {
         return (this.price * this.quantity).toFixed(2);
     }
   }