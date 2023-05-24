"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartProductDeleteMutation = exports.CartProductUpdateCheckMutation = exports.CartProductUpdateMutation = exports.CartProductMutation = exports.CartProductByCartQuery = exports.CartProductQuery = exports.CartProduct = void 0;
const nexus_1 = require("nexus");
exports.CartProduct = (0, nexus_1.objectType)({
    name: "CartProduct",
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
exports.CartProductQuery = (0, nexus_1.extendType)({
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
exports.CartProductByCartQuery = (0, nexus_1.extendType)({
    type: "Query",
    definition(t) {
        t.nonNull.list.field("cartProductByCart", {
            type: "CartProduct",
            args: {
                cart_id: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
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
exports.CartProductMutation = (0, nexus_1.extendType)({
    type: "Mutation",
    definition(t) {
        t.nonNull.field("createCartProduct", {
            type: "CartProduct",
            args: {
                cart_id: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
                product_id: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
                quantity: (0, nexus_1.nonNull)((0, nexus_1.intArg)()),
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
exports.CartProductUpdateMutation = (0, nexus_1.extendType)({
    type: "Mutation",
    definition(t) {
        t.nonNull.field("cartProductUpdateQty", {
            type: "CartProduct",
            args: {
                cartProduct_id: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
                quantity: (0, nexus_1.nonNull)((0, nexus_1.intArg)()),
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
exports.CartProductUpdateCheckMutation = (0, nexus_1.extendType)({
    type: "Mutation",
    definition(t) {
        t.nonNull.field("cartProductUpdateCheck", {
            type: "CartProduct",
            args: {
                cartProduct_id: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
                checked: (0, nexus_1.nonNull)((0, nexus_1.booleanArg)()),
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
exports.CartProductDeleteMutation = (0, nexus_1.extendType)({
    type: "Mutation",
    definition(t) {
        t.nonNull.field("cartProductDelete", {
            type: "CartProduct",
            args: {
                cartProduct_id: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
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
