import User from "../models/user.model.js";
import Product from "../models/product.model.js";
import Order from "../models/order.model.js";

export const findUser = () => {
  return User.find().select("name email role").lean().exec();
};

export const findProduct = () => {
  return Product.find().select("-__v").lean().exec();
};

export const findOrder = () => {
  return Order.find()
    .populate("user", "name email")
    .populate("products.product", "name price")
    .select("-__v")
    .exec();
};

export const findAdvanced = () => {
  return Order.find()
    .where("status")
    .ne("cancelled")
    .sort({ createdAt: -1 })
    .skip(0)
    .limit(20)
    .select("user products totalPrice status createdAt")
    .populate({
      path: "user",
      select: "name email",
      options: { lean: true },
    })
    .populate({
      path: "products.product",
      select: "name price",
      options: { lean: true },
    })
    .exec();
};
