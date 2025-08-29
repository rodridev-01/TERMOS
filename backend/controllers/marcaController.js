import Marca from "../models/marca.js";

export const getMarcas = async (req, res) => {
  try {
    const marcas = await Marca.getAll();
    res.json(marcas);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las marcas" });
  }
};

export const getMarcaById = async (req, res) => {
  try {
    const marca = await Marca.getById(req.params.id);
    if (!marca) return res.status(404).json({ error: "Marca no encontrada" });
    res.json(marca);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la marca" });
  }
};

export const createMarca = async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;
    const logo = req.file ? `/uploads/marcas/${req.file.filename}` : null;

    const nuevaMarca = await Marca.create({ nombre, descripcion, logo });
    res.status(201).json(nuevaMarca);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear la marca" });
  }
};

export const updateMarca = async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;
    const logo = req.file ? `/uploads/marcas/${req.file.filename}` : null;

    const updated = await Marca.update(req.params.id, { nombre, descripcion, logo });
    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar la marca" });
  }
};

export const deleteMarca = async (req, res) => {
  try {
    const deleted = await Marca.delete(req.params.id);
    res.json(deleted);
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la marca" });
  }
};
