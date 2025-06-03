import { connect, disconnect } from "mongoose";
import { connectionString } from "./index.js";
import User from "../models/users.model.js";
import Product from "../models/products.model.js";
import Order from "../models/orders.model.js";

(async () => {
  console.log("Seeding started");

  await connect(connectionString!);

  await User.deleteMany({});
  await Product.deleteMany({});
  await Order.deleteMany({});

  const [John, Bapu, Donald] = await User.insertMany([
    {
      name: "John Bhai",
      age: 20,
      email: "Johnbhai@gmail.com",
      password: "12345678",
    },
    {
      name: "Gandhi Bapu",
      age: 21,
      email: "gandhiBapu@gmail.com",
      password: "12345678",
      role: "admin",
    },
    {
      name: "Donald Bhai",
      age: 22,
      email: "donaldbhai@gmail.com",
      password: "12345678",
    },
  ]);

  const [Laptop, Mobile, DSLR] = await Product.insertMany([
    {
      name: "Laptop",
      description: "Ye hai laptop",
      price: 1200,
      stock: 10,
    },
    {
      name: "Mobile",
      description: "Ye hai Mobile",
      price: 800,
      stock: 20,
    },
    {
      name: "DSLR",
      description: "Ye hai chapriyo ke liye DSLR",
      price: 400,
      stock: 6,
    },
  ]);

  await Order.insertMany([
    {
      user: John._id,
      products: [
        {
          productId: Laptop._id,
          quantity: 1,
        },
        {
          productId: Mobile._id,
          quantity: 1,
        },
      ],
      totalPrice: 2000,
      status: "pending",
    },
    {
      user: Bapu._id,
      products: [
        {
          productId: Mobile._id,
          quantity: 1,
        },
        {
          productId: DSLR._id,
          quantity: 1,
        },
      ],
      totalPrice: 1200,
      status: "shipped",
    },
    {
      user: Donald._id,
      products: [
        {
          productId: Laptop._id,
          quantity: 1,
        },
        {
          productId: Mobile._id,
          quantity: 1,
        },
        {
          productId: DSLR._id,
          quantity: 1,
        },
      ],
      totalPrice: 2400,
      status: "delivered",
    },
  ]);

  console.log("Seeding complete");
  await disconnect();
})().catch(async (err) => {
  console.log(err);
  await disconnect();
});
