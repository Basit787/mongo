import type { Context } from "hono";
import { findAdvanced, findOrder, findProduct, findUser } from "../service/mongo.service.js";

export const getUsers = async (c: Context) => {
  try {
    const users = await findUser();
    return c.json(users);
  } catch (error) {
    console.error(error);
    return c.json({ error: "Failed to fetch users" }, 500);
  }
};

export const getProducts = async (c: Context) => {
  try {
    const products = await findProduct();
    return c.json(products);
  } catch (error) {
    console.error(error);
    return c.json({ error: "Failed to fetch products" }, 500);
  }
};

export const getOrders = async (c: Context) => {
  try {
    const orders = await findOrder();
    return c.json(orders);
  } catch (error) {
    console.error(error);
    return c.json({ error: "Failed to fetch orders" }, 500);
  }
};

export const getOrdersAdvanced = async (c: Context) => {
  try {
    const orders = await findAdvanced();
    return c.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    return c.json({ error: "Failed to fetch orders" }, 500);
  }
};
