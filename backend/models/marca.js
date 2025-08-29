import pool from "../config/db.js";

const Marca = {
  getAll: async () => {
    const [rows] = await pool.query("SELECT * FROM marcas");
    return rows;
  },

  getById: async (id) => {
    const [rows] = await pool.query("SELECT * FROM marcas WHERE id = ?", [id]);
    return rows[0];
  },

  create: async (data) => {
    const { nombre, descripcion, logo } = data;
    const [result] = await pool.query(
      "INSERT INTO marcas (nombre, descripcion, logo) VALUES (?, ?, ?)",
      [nombre, descripcion, logo]
    );
    return { id: result.insertId, ...data };
  },

  update: async (id, data) => {
    const { nombre, descripcion, logo } = data;

    if (logo) {
      await pool.query(
        "UPDATE marcas SET nombre=?, descripcion=?, logo=? WHERE id=?",
        [nombre, descripcion, logo, id]
      );
    } else {
      await pool.query(
        "UPDATE marcas SET nombre=?, descripcion=? WHERE id=?",
        [nombre, descripcion, id]
      );
    }

    return { id, ...data };
  },

  delete: async (id) => {
    await pool.query("DELETE FROM marcas WHERE id=?", [id]);
    return { message: "Marca eliminada correctamente" };
  },
};

export default Marca;
