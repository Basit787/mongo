import { connect, disconnect } from "mongoose";
import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import User from "../models/user.model.js";
import { connectionString } from "./index.js";

(async () => {
  await connect(connectionString!);

  await User.deleteMany({});
  await Product.deleteMany({});
  await Order.deleteMany({});

  const [Alice, Bob, Dany] = await User.insertMany([
    {
      name: "Alice",
      email: "alice@example.com",
      password: "Hashedpass@1",
      role: "customer",
    },
    {
      name: "Bob",
      email: "bob@example.com",
      password: "Hashedpass@2",
      role: "admin",
    },
    {
      name: "Dany",
      email: "dany@example.com",
      password: "Hashedpass@3",
      role: "customer",
    },
  ]);

  const [Laptop, Headphone, Mouse] = await Product.insertMany([
    {
      name: "Laptop",
      description: "Gaming laptop",
      price: 1200,
      stock: 10,
    },
    {
      name: "Headphones",
      description: "Noise-cancelling",
      price: 200,
      stock: 50,
    },
    {
      name: "Mouse",
      description: "Wireless mouse",
      price: 50,
      stock: 100,
    },
  ]);

  await Order.insertMany([
    {
      user: Alice._id,
      products: [
        { product: Laptop._id, quantity: 1 },
        { product: Headphone._id, quantity: 2 },
        { product: Mouse._id, quantity: 2 },
      ],
      totalPrice: 1600,
      status: "pending",
    },
    {
      user: Bob._id,
      products: [
        { product: Headphone._id, quantity: 1 },
        { product: Mouse._id, quantity: 2 },
      ],
      totalPrice: 250,
      status: "shipped",
    },
    {
      user: Dany._id,
      products: [
        { product: Laptop._id, quantity: 1 },
        { product: Headphone._id, quantity: 1 },
        { product: Mouse._id, quantity: 1 },
      ],
      totalPrice: 1450,
      status: "delivered",
    },
  ]);

  console.log("Seeded successfully");
  await disconnect();
})().catch((err) => {
  console.error(err);
  disconnect();
});
