import { Hono } from "hono";
import { getOrders, getProducts, getUsers } from "../controller/populate.controller.js";

const populateRoutes = new Hono();

populateRoutes.get("/users", getUsers);
populateRoutes.get("/products", getProducts);
populateRoutes.get("/orders", getOrders);

export default populateRoutes;
