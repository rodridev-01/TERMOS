import { body, validationResult } from "express-validator";

export const validateProducto = [
  body("nombre").isString().notEmpty(),
  body("descripcion").isString().optional(),
  body("marca_id").isInt(),
  body("categoria_id").isInt(),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
