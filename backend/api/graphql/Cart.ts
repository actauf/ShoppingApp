import {
  extendType,
  objectType,
  stringArg,
  nonNull,
  list,
  inputObjectType,
} from "nexus";
import { Product } from "./Product";
import { CartProduct } from "./CartProduct";

export const Cart = objectType({
  name: "Cart",
  definition(t) {
    t.string("id");
    t.string("name");
    t.string("user_id");
    t.list.field("cartProducts", {
      type: "CartProduct",
      resolve: (parent, _, ctx) => {
        return ctx.db.cartProducts.findMany({
          where: { cart_id: parent.id },
        });
      },
    });
  },
});

export const CartsProducts = inputObjectType({
  name: "CartsProducts",
  definition(t) {
    t.nonNull.string("id");
  },
});

export const CartQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.field("carts", {
      type: "Cart",
      resolve(_root, _args, ctx) {
        return ctx.db.carts.findMany();
      },
    });
  },
});

export const getCartByUser = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.field("cartsByUser", {
      type: "Cart",
      args: {
        user_id: nonNull(stringArg()),
      },
      resolve(_root, _args, ctx) {
        return ctx.db.carts.findMany({
          where: {
            user_id: _args.user_id,
          },
        });
      },
    });
  },
});

export const getCart = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.field("cart", {
      type: "Cart",
      args: {
        cart_id: nonNull(stringArg()),
      },
      resolve(_root, _args, ctx) {
        return ctx.db.carts.findUnique({
          where: {
            id: _args.cart_id,
          },
        });
      },
    });
  },
});

export const CartMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("createCart", {
      type: "Cart",
      args: {
        user_id: nonNull(stringArg()),
        name: nonNull(stringArg()),
        products: list(CartsProducts),
      },
      resolve(_root, args, ctx) {
        const cart = {
          user_id: args.user_id,
          name: args.name,
          products: args.products,
        };
        return ctx.db.carts.create({ data: cart });
      },
    });
  },
});

export const AddProductToCart = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("addProductToCart", {
      type: "Cart",
      args: {
        card_id: nonNull(stringArg()),
        products: nonNull(list(CartsProducts)),
      },
      resolve(_root, args, ctx) {
        const cart = {
          products: args.products,
        };
        return ctx.db.carts.updateOne({ _id: args.card_id }, { data: cart });
      },
    });
  },
});
