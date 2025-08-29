import Producto from "../models/product.js";

export async function getProductos(req, res, next) {
  try {
    const productos = await Producto.getAll();
    res.json(productos);
  } catch (err) {
    next(err);
  }
}

export async function getProducto(req, res, next) {
  try {
    const { id } = req.params;
    const producto = await Producto.getById(id);
    if (!producto) return res.status(404).json({ mensaje: "Producto no encontrado" });
    res.json(producto);
  } catch (err) {
    next(err);
  }
}

export async function addProducto(req, res, next) {
  try {
    const nuevoProducto = await Producto.create(req.body);
    res.status(201).json(nuevoProducto);
  } catch (err) {
    next(err);
  }
}

export async function updateProducto(req, res, next) {
  try {
    const { id } = req.params;
    const updated = await Producto.update(id, req.body);
    if (updated === 0) return res.status(404).json({ mensaje: "Producto no encontrado" });
    res.json({ mensaje: "Producto actualizado" });
  } catch (err) {
    next(err);
  }
}

export async function deleteProducto(req, res, next) {
  try {
    const { id } = req.params;
    const deleted = await Producto.delete(id);
    if (deleted === 0) return res.status(404).json({ mensaje: "Producto no encontrado" });
    res.json({ mensaje: "Producto eliminado" });
  } catch (err) {
    next(err);
  }
}
