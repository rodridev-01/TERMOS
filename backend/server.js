import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import path from "path"; // <-- Agregado

import { errorHandler } from "./middleware/errorHandler.js";
import productosRoutes from "./routes/productRoute.js";
import marcaRoutes from "./routes/marcaRoute.js";

dotenv.config();
const app = express();

// Seguridad
app.use(helmet());
app.use(cors({ origin: ["http://localhost:3000"] }));
app.use(express.json());

// Rate limiting
const limiter = rateLimit({ windowMs: 15*60*1000, max: 100 });
app.use(limiter);

app.use("/uploads", express.static(path.join("public", "uploads"))); 

app.use("/productos", productosRoutes);
app.use("/marca", marcaRoutes);

// Middleware de errores
app.use(errorHandler);

const PORT = process.env.B_PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
