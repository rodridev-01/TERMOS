import Producto from "../models/producto.js";

// Obtener todos los productos
export const getProductos = async (req, res) => {
  try {
    const productos = await Producto.getAll();
    res.json(productos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los productos" });
  }
};

// cache simple en memoria
const cache = new Map();

export const getProductoById = async (req, res) => {
  try {
    const id = req.params.id;

    // Revisar en cache primero
    if (cache.has(id)) {
      return res.json(cache.get(id));
    }

    const producto = await Producto.getById(id);
    if (!producto) return res.status(404).json({ error: "Producto no encontrado" });

    // Guardar en cache (ejemplo: 5 min)
    cache.set(id, producto);
    setTimeout(() => cache.delete(id), 5 * 60 * 1000);

    res.json(producto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener el producto" });
  }
};
// Crear producto
export const createProducto = async (req, res) => {
  try {
    const { nombre, descripcion, precio, stock, marca_id, categoria_id } = req.body;
    const imagen = req.file ? `/uploads/productos/${req.file.filename}` : null;

    const nuevoProducto = await Producto.create({
      nombre,
      descripcion,
      precio,
      stock,
      marca_id,
      categoria_id,
      imagen,
    });

    res.status(201).json(nuevoProducto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear el producto" });
  }
};

// Actualizar producto
export const updateProducto = async (req, res) => {
  try {
    const { nombre, descripcion, precio, stock, marca_id, categoria_id, imagenActual } = req.body;

    let imagen = imagenActual;
    if (req.file) {
      imagen = `/uploads/productos/${req.file.filename}`;
    }

    const updated = await Producto.update(req.params.id, {
      nombre,
      descripcion,
      precio,
      stock,
      marca_id,
      categoria_id,
      imagen,
    });

    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar el producto" });
  }
};

// Eliminar producto
export const deleteProducto = async (req, res) => {
  try {
    const deleted = await Producto.delete(req.params.id);
    res.json(deleted);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar el producto" });
  }
};
