import Categoria from "../models/categoria.js";

export const getCategorias = async (req, res) => {
  try {
    const categorias = await Categoria.getAll();
    res.json(categorias);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las categorías" });
  }
};

export const getCategoriaById = async (req, res) => {
  try {
    const categoria = await Categoria.getById(req.params.id);
    if (!categoria) return res.status(404).json({ error: "Categoría no encontrada" });
    res.json(categoria);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la categoría" });
  }
};

export const createCategoria = async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;
    const imagen = req.file ? `/uploads/categorias/${req.file.filename}` : null;

    const nuevaCategoria = await Categoria.create({ nombre, descripcion, imagen });
    res.status(201).json(nuevaCategoria);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear la categoría" });
  }
};

export const updateCategoria = async (req, res) => {
  try {
    const { nombre, descripcion, imagenActual } = req.body;

    let imagen = imagenActual;
    if (req.file) {
      imagen = `/uploads/categorias/${req.file.filename}`;
    }

    const updated = await Categoria.update(req.params.id, { nombre, descripcion, imagen });
    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar la categoría" });
  }
};

export const deleteCategoria = async (req, res) => {
  try {
    const deleted = await Categoria.delete(req.params.id);
    res.json(deleted);
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la categoría" });
  }
};
