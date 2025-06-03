import type { Context } from "hono";
import * as a from "../service/aggregate.service.js";

export const match = async (c: Context) => {
  try {
    const result = await a.match();
    return c.json({ message: "Aggregate $match", result });
  } catch (error) {
    return c.json({ message: "Internal server error" }, 500);
  }
};

export const lookup = async (c: Context) => {
  try {
    const result = await a.lookup();
    return c.json({ message: "Aggregate $lookup", result });
  } catch (error) {
    return c.json({ message: "Internal server error" }, 500);
  }
};

export const unwind = async (c: Context) => {
  try {
    const result = await a.unwind();
    return c.json({ message: "Aggregate $unwind", result });
  } catch (error) {
    return c.json({ message: "Internal server error" }, 500);
  }
};

export const lookupUnwind = async (c: Context) => {
  try {
    const result = await a.lookupUnwind();
    return c.json({ message: "Aggregate $lookupUnwind", result });
  } catch (error) {
    return c.json({ message: "Internal server error" }, 500);
  }
};

export const addField = async (c: Context) => {
  try {
    const result = await a.addField();
    return c.json({ message: "Aggregate $addField", result });
  } catch (error) {
    return c.json({ message: "Internal server error" }, 500);
  }
};

export const group = async (c: Context) => {
  try {
    const result = await a.group();
    return c.json({ message: "Aggregate $group", result });
  } catch (error) {
    return c.json({ message: "Internal server error" }, 500);
  }
};

export const project = async (c: Context) => {
  try {
    const result = await a.project();
    return c.json({ message: "Aggregate $project", result });
  } catch (error) {
    return c.json({ message: "Internal server error" }, 500);
  }
};

export const sort = async (c: Context) => {
  try {
    const result = await a.sort();
    return c.json({ message: "Aggregate $sort", result });
  } catch (error) {
    return c.json({ message: "Internal server error" }, 500);
  }
};

export const orderDetails = async (c: Context) => {
  try {
    const result = await a.orderDetails();
    return c.json({ message: "Aggregate $orderDetails", result });
  } catch (error) {
    return c.json({ message: "Internal server error" }, 500);
  }
};
