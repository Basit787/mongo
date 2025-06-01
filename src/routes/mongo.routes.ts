import { Hono } from "hono";
import {
  getOrders,
  getOrdersAdvanced,
  getProducts,
  getUsers,
} from "../controller/mongo.controller.js";

const router = new Hono();

router.get("/users", getUsers);
router.get("/products", getProducts);
router.get("/orders", getOrders);
router.get("/advance", getOrdersAdvanced);

export default router;
