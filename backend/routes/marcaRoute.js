import express from "express";
import {
  getMarcas,
  getMarcaById,
  createMarca,
  updateMarca,
  deleteMarca,
} from "../controllers/marcaController.js";
import upload from "../middleware/upload.js"; 

const router = express.Router();

router.get("/", getMarcas);
router.get("/:id", getMarcaById);

// Agrega el middleware de multer
router.post("/", upload.single("logo"), createMarca);
router.put("/:id", upload.single("logo"), updateMarca);

router.delete("/:id", deleteMarca);

export default router;
