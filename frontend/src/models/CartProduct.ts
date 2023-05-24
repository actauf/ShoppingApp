import {Cart} from './Cart';
import {Product} from './Product';

export interface CartProduct {
  id: number;
  quantity: number;
  checked: boolean;
  product_id: string;
  product: Product;
  cart_id: string;
  cart: Cart | undefined;
}
