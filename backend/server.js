import express from "express";
import cors from "cors";
import morgan from "morgan";
import "dotenv/config";
import colors from "colors";
import connectDB from "./config/db.js";
import { clerkMiddleware } from "@clerk/express";
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js";

const app = express();
const PORT = 3000;

await connectDB();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(clerkMiddleware());

app.get("/", (req, res) => res.send("server is live"));

app.use("/api/inngest", serve({ client: inngest, functions }));

app.listen(PORT, () =>
  console.log(`Server is running on port ${PORT}`.white.bgMagenta)
);
