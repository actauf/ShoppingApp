"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductMutation = exports.ProductQuery = exports.Product = void 0;
const nexus_1 = require("nexus");
exports.Product = (0, nexus_1.objectType)({
    name: "Product",
    definition(t) {
        t.string("id");
        t.string("name");
        t.string("desc");
        t.float("price");
        t.string("image");
    },
});
exports.ProductQuery = (0, nexus_1.extendType)({
    type: "Query",
    definition(t) {
        t.nonNull.list.field("products", {
            type: "Product",
            resolve(_root, _args, ctx) {
                // 1
                return ctx.db.products.findMany();
            },
        });
    },
});
exports.ProductMutation = (0, nexus_1.extendType)({
    type: "Mutation",
    definition(t) {
        t.nonNull.field("createProduct", {
            type: "Product",
            args: {
                // 1
                name: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
                desc: (0, nexus_1.stringArg)(),
                price: (0, nexus_1.nonNull)((0, nexus_1.floatArg)()),
                image: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
            },
            resolve(_root, args, ctx) {
                const product = {
                    name: args.name,
                    desc: args.desc,
                    price: args.price,
                    image: args.image,
                };
                return ctx.db.products.create({ data: product });
            },
        });
    },
});
