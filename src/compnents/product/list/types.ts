// Product interface
 export interface IProduct {
    id: number;
    category_id: number;
    name: string;
    price: number;
    description: string;
    product_images: IProductImage[];
  }
  
  // ProductImage interface
  export interface IProductImage {
    id: number;
    product_id: number;
    name: string;
    priority: number;
  }
  
  // Category interface
  export interface ICategory {
    id: number;
    name: string;
    image: string;
    description: string;
    products: IProduct[];
  }