import { serve } from "@hono/node-server";
import { Hono } from "hono";
import ENV from "./lib/env.js";
import connectDb from "./db/index.js";
import router from "./routes/mongo.routes.js";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.route("/", router);

await connectDb((data) => {
  if (!!data) {
    console.log(data);
    serve({ fetch: app.fetch, port: ENV.PORT }, (info) => {
      console.log(`Server is running on http://localhost:${info.port}`);
    });
  }
});
