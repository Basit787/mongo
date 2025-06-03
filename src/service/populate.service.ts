import Order from "../models/orders.model.js";
import Product from "../models/products.model.js";
import User from "../models/users.model.js";

export const findUsers = () => {
  return User.find().select("-__v -password").exec();
};

export const findProducts = () => {
  return Product.find().select("-__v").exec();
};

export const findOrders = () => {
  return Order.find()
    .select("-__v")
    .populate({
      path: "user",
      select: "-__v -password",
    })
    .populate({
      path: "products.productId",
      select: "-__v",
    })
    .exec();
};
