import express from "express";
import {
  getProductos,
  getProductoById,
  createProducto,
  updateProducto,
  deleteProducto,
} from "../controllers/productosController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.get("/", getProductos);

router.get("/:id", getProductoById);

router.post("/", upload.single("imagen"), createProducto);

router.put("/:id", upload.single("imagen"), updateProducto);

// Eliminar producto
router.delete("/:id", deleteProducto);

export default router;
