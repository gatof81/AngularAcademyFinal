export interface User {
  _id?: number;
  username?: string;
  token?: string;
  shippingAddress?: string;
  billingAddress?: string;
  userRole?:number;
}
