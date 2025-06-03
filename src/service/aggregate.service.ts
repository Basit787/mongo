import Order from "../models/orders.model.js";

export const match = () => {
  return Order.aggregate([
    {
      $match: { status: "delivered" },
    },
  ]);
};

export const lookup = () => {
  return Order.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "user",
      },
    },
    { $unwind: "$products" },
  ]);
};

export const unwind = () => {
  return Order.aggregate([{ $unwind: "$products" }]);
};

export const lookupUnwind = () => {
  return Order.aggregate([
    { $unwind: "$products" },
    {
      $lookup: {
        from: "products",
        localField: "products.productId",
        foreignField: "_id",
        as: "product",
      },
    },
    { $unwind: "$product" },
  ]);
};

export const addField = () => {
  return Order.aggregate([
    // Unwind the products array
    { $unwind: "$products" },

    // Lookup to fetch product info
    {
      $lookup: {
        from: "products",
        localField: "products.productId",
        foreignField: "_id",
        as: "product",
      },
    },
    { $unwind: "$product" },

    // Add the calculated field
    {
      $addFields: {
        itemTotal: {
          $multiply: ["$products.quantity", "$product.price"],
        },
      },
    },
  ]);
};

export const group = () => {
  return Order.aggregate([
    {
      $group: {
        _id: "$_id",
        user: { $first: "$user" },
        status: { $first: "$status" },
        totalPrice: { $first: "$totalPrice" },
        createdAt: { $first: "$createdAt" },
        products: {
          $push: {
            name: "$product.name",
            unitPrice: "$product.price",
            quantity: "$products.quantity",
            itemTotal: "$itemTotal",
          },
        },
      },
    },
  ]);
};

export const project = () => {
  return Order.aggregate([
    {
      $project: {
        _id: 0,
        orderId: "$_id",
        customer: {
          name: "$user.name",
          email: "$user.email",
        },
        status: 1,
        totalPrice: 1,
        createdAt: 1,
        products: 1,
      },
    },
  ]);
};

export const sort = () => {
  return Order.aggregate([{ $sort: { createdAt: -1 } }]);
};

export const orderDetails = () => {
  return Order.aggregate([
    // Join with User collection
    {
      $lookup: {
        from: "users", // collection name (lowercase plural)
        localField: "user",
        foreignField: "_id",
        as: "user",
      },
    },
    { $unwind: "$user" },

    // Unwind the products array to deal with each product individually
    { $unwind: "$products" },

    // Join with Product collection
    {
      $lookup: {
        from: "products",
        localField: "products.productId",
        foreignField: "_id",
        as: "product",
      },
    },
    { $unwind: "$product" },

    // Calculate the total for each product in the order
    {
      $addFields: {
        itemTotal: {
          $multiply: ["$products.quantity", "$product.price"],
        },
      },
    },

    // Group back to reconstruct the order
    {
      $group: {
        _id: "$_id",
        user: { $first: "$user" },
        status: { $first: "$status" },
        createdAt: { $first: "$createdAt" },
        totalPrice: { $first: "$totalPrice" },
        products: {
          $push: {
            name: "$product.name",
            description: "$product.description",
            unitPrice: "$product.price",
            quantity: "$products.quantity",
            itemTotal: "$itemTotal",
          },
        },
      },
    },

    // Optional: format output
    {
      $project: {
        _id: 0,
        orderId: "$_id",
        customer: {
          name: "$user.name",
          email: "$user.email",
        },
        status: 1,
        createdAt: 1,
        totalPrice: 1,
        products: 1,
      },
    },

    // Optional: sort by newest order
    { $sort: { createdAt: -1 } },
  ]);
};
