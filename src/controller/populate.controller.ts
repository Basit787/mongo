import type { Context } from "hono";
import * as m from "../service/populate.service.js";

export const getUsers = async (c: Context) => {
  try {
    const result = await m.findUsers();
    return c.json({ message: "User fetched successfully", result }, 200);
  } catch (error) {
    return c.json({ message: "Internal server error", error }, 500);
  }
};

export const getProducts = async (c: Context) => {
  try {
    const result = await m.findProducts();
    return c.json({ message: "Product fetched successfully", result }, 200);
  } catch (error) {
    return c.json({ message: "Internal server error", error }, 500);
  }
};
export const getOrders = async (c: Context) => {
  try {
    const result = await m.findOrders();
    return c.json({ message: "orders fetched successfully", result }, 200);
  } catch (error) {
    return c.json({ message: "Internal server error", error }, 500);
  }
};
