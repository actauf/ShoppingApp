import { extendType, objectType, stringArg, nonNull, floatArg } from "nexus";

export const Product = objectType({
  name: "Product", // <- Name of your type
  definition(t) {
    t.string("id");
    t.string("name");
    t.string("desc");
    t.float("price");
    t.string("image");
  },
});

export const ProductQuery = extendType({
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

export const ProductMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("createProduct", {
      type: "Product",
      args: {
        // 1
        name: nonNull(stringArg()),
        desc: stringArg(),
        price: nonNull(floatArg()),
        image: nonNull(stringArg()),
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
