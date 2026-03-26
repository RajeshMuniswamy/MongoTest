import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.mjs";
import authRouter from "./routers/auth.router.mjs";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: ["http://localhost:5173", "https://pickbaskets.shop"],
    credentials: true,
  }),
);

app.get("/", (req, res) => {
  res.send("API working 🚀");
});

app.use("/api/auth", authRouter);

app.listen(PORT, () => {
  console.log("Server is running on " + `http://localhost:${PORT}`);
  connectDB();
});
