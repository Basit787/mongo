import { Hono } from "hono";
import * as agg from "../controller/aggregate.controller.js";

const aggregateRoutes = new Hono();

aggregateRoutes.get("/match", agg.match);
aggregateRoutes.get("/lookup", agg.lookup);
aggregateRoutes.get("/unwind", agg.unwind);
aggregateRoutes.get("/lookupUnwind", agg.lookupUnwind);
aggregateRoutes.get("/addField", agg.addField);
aggregateRoutes.get("/group", agg.group);
aggregateRoutes.get("/project", agg.project);
aggregateRoutes.get("/sort", agg.sort);
aggregateRoutes.get("/toget", agg.orderDetails);

export default aggregateRoutes;
