import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.mjs";
import authRouter from "./routers/auth.router.mjs";
import cors from "cors";

dotenv.config();
const app = express();

const PORT = process.env.PORT;

app.use(express.json());
// app.use(cors());
app.use(
  cors({
    origin: "https://pickbaskets.shop",
    credentials: true,
  }),
);

app.use("/api/auth", authRouter);

app.listen(PORT, () => {
  console.log("Server is running on " + `http://localhost:${PORT}`);
  connectDB();
});
