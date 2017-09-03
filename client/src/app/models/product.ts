export interface Product {
  id: number;
  prod_name: string;
  description: string;
  images: Array<any>;
  price: number;
  inCart?:boolean;
}
