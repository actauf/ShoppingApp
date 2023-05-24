import {CartProduct} from './CartProduct';

export interface Cart {
  userId: number;
  id: string;
  name: string;
  cartProducts: CartProduct[];
}
