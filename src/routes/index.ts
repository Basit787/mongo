import { Hono } from "hono";
import populateRoutes from "./populate.routes.js";
import aggregateRoutes from "./aggregate.routes.js";

const router = new Hono();

router.route("/populate", populateRoutes);
router.route("/aggregate", aggregateRoutes);

export default router;
