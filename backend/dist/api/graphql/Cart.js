"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddProductToCart = exports.CartMutation = exports.getCart = exports.getCartByUser = exports.CartQuery = exports.CartsProducts = exports.Cart = void 0;
const nexus_1 = require("nexus");
exports.Cart = (0, nexus_1.objectType)({
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
exports.CartsProducts = (0, nexus_1.inputObjectType)({
    name: "CartsProducts",
    definition(t) {
        t.nonNull.string("id");
    },
});
exports.CartQuery = (0, nexus_1.extendType)({
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
exports.getCartByUser = (0, nexus_1.extendType)({
    type: "Query",
    definition(t) {
        t.nonNull.list.field("cartsByUser", {
            type: "Cart",
            args: {
                user_id: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
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
exports.getCart = (0, nexus_1.extendType)({
    type: "Query",
    definition(t) {
        t.nonNull.field("cart", {
            type: "Cart",
            args: {
                cart_id: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
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
exports.CartMutation = (0, nexus_1.extendType)({
    type: "Mutation",
    definition(t) {
        t.nonNull.field("createCart", {
            type: "Cart",
            args: {
                user_id: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
                name: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
                products: (0, nexus_1.list)(exports.CartsProducts),
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
exports.AddProductToCart = (0, nexus_1.extendType)({
    type: "Mutation",
    definition(t) {
        t.nonNull.field("addProductToCart", {
            type: "Cart",
            args: {
                card_id: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
                products: (0, nexus_1.nonNull)((0, nexus_1.list)(exports.CartsProducts)),
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
