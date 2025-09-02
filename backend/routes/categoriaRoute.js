import express from "express";
import {
  getCategorias,
  getCategoriaById,
  createCategoria,
  updateCategoria,
  deleteCategoria,
} from "../controllers/categoriasController.js";
import upload from "../middleware/upload.js";

const router = express.Router();


router.get("/", getCategorias);
router.get("/:id", getCategoriaById);
router.post("/", upload.single("imagen"), createCategoria);

router.put("/:id", upload.single("imagen"), updateCategoria);

router.delete("/:id", deleteCategoria);

export default router;
