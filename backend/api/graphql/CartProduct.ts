import {
  extendType,
  objectType,
  stringArg,
  nonNull,
  intArg,
  booleanArg,
} from "nexus";

export const CartProduct = objectType({
  name: "CartProduct", // <- Name of your type
  definition(t) {
    t.string("id");
    t.int("quantity");
    t.boolean("checked");
    t.string("cart_id");
    t.field("cart", {
      type: "Cart",
      resolve: (parent, _, ctx) => {
        return ctx.db.carts.findUnique({
          where: { id: parent.cart_id },
        });
      },
    });
    t.string("product_id");
    t.field("product", {
      type: "Product",
      resolve: (parent, _, ctx) => {
        return ctx.db.products.findUnique({
          where: { id: parent.product_id },
        });
      },
    });
  },
});

export const CartProductQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.field("cartsProducts", {
      type: "CartProduct",
      resolve(_root, _args, ctx) {
        return ctx.db.cartProducts.findMany();
      },
    });
  },
});

export const CartProductByCartQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.field("cartProductByCart", {
      type: "CartProduct",
      args: {
        cart_id: nonNull(stringArg()),
      },
      resolve(_root, _args, ctx) {
        return ctx.db.cartProducts.findMany({
          where: {
            cart_id: _args.cart_id,
          },
        });
      },
    });
  },
});

export const CartProductMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("createCartProduct", {
      type: "CartProduct",
      args: {
        cart_id: nonNull(stringArg()),
        product_id: nonNull(stringArg()),
        quantity: nonNull(intArg()),
      },
      resolve(_root, _args, ctx) {
        const cartProduct = {
          quantity: _args.quantity,
          cart_id: _args.cart_id,
          product_id: _args.product_id,
        };
        return ctx.db.cartProducts.create({ data: cartProduct });
      },
    });
  },
});

export const CartProductUpdateMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("cartProductUpdateQty", {
      type: "CartProduct",
      args: {
        cartProduct_id: nonNull(stringArg()),
        quantity: nonNull(intArg()),
      },
      resolve(_root, _args, ctx) {
        const data = {
          quantity: _args.quantity,
        };
        return ctx.db.cartProducts.update({
          where: {
            id: _args.cartProduct_id,
          },
          data: data,
        });
      },
    });
  },
});

export const CartProductUpdateCheckMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("cartProductUpdateCheck", {
      type: "CartProduct",
      args: {
        cartProduct_id: nonNull(stringArg()),
        checked: nonNull(booleanArg()),
      },
      resolve(_root, _args, ctx) {
        const data = {
          checked: _args.checked,
        };
        return ctx.db.cartProducts.update({
          where: {
            id: _args.cartProduct_id,
          },
          data: data,
        });
      },
    });
  },
});

export const CartProductDeleteMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("cartProductDelete", {
      type: "CartProduct",
      args: {
        cartProduct_id: nonNull(stringArg()),
      },
      resolve(_root, _args, ctx) {
        return ctx.db.cartProducts.delete({
          where: {
            id: _args.cartProduct_id,
          },
        });
      },
    });
  },
});
