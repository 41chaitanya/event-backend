import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routes/auth.routes.js";
import eventRouter from "./routes/event.routes.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);
app.use("/events", eventRouter);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
