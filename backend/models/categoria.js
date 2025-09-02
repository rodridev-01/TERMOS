import pool from "../config/db.js";

const Categoria = {
  getAll: async () => {
    const [rows] = await pool.query("SELECT * FROM categorias");
    return rows;
  },

  getById: async (id) => {
    const [rows] = await pool.query("SELECT * FROM categorias WHERE id = ?", [id]);
    return rows[0];
  },

  create: async (data) => {
    const { nombre, descripcion, imagen } = data;
    const [result] = await pool.query(
      "INSERT INTO categorias (nombre, descripcion, imagen) VALUES (?, ?, ?)",
      [nombre, descripcion, imagen]
    );
    return { id: result.insertId, ...data };
  },

  update: async (id, data) => {
    const { nombre, descripcion, imagen } = data;

    if (imagen) {
      await pool.query(
        "UPDATE categorias SET nombre=?, descripcion=?, imagen=? WHERE id=?",
        [nombre, descripcion, imagen, id]
      );
    } else {
      await pool.query(
        "UPDATE categorias SET nombre=?, descripcion=? WHERE id=?",
        [nombre, descripcion, id]
      );
    }

    return { id, ...data };
  },

  delete: async (id) => {
    await pool.query("DELETE FROM categorias WHERE id=?", [id]);
    return { message: "Categoría eliminada correctamente" };
  },
};

export default Categoria;
