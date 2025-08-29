import pool from "../config/db.js";

const Producto = {
  // Obtener todos los productos
  async getAll() {
    const [rows] = await pool.query("SELECT * FROM productos");
    return rows;
  },

  async getById(id) {
    const [rows] = await pool.query("SELECT * FROM productos WHERE id = ?", [id]);
    return rows[0]; 
  },

  // Crear un nuevo producto
  async create({ nombre, descripcion, marca_id, categoria_id }) {
    const [result] = await pool.query(
      "INSERT INTO productos (nombre, descripcion, marca_id, categoria_id) VALUES (?, ?, ?, ?)",
      [nombre, descripcion, marca_id, categoria_id]
    );
    return { id: result.insertId, nombre, descripcion, marca_id, categoria_id };
  },

  // Actualizar un producto
  async update(id, { nombre, descripcion, marca_id, categoria_id }) {
    const [result] = await pool.query(
      `UPDATE productos 
       SET nombre = ?, descripcion = ?, marca_id = ?, categoria_id = ? 
       WHERE id = ?`,
      [nombre, descripcion, marca_id, categoria_id, id]
    );
    return result.affectedRows; 
  },

  // Eliminar un producto
  async delete(id) {
    const [result] = await pool.query("DELETE FROM productos WHERE id = ?", [id]);
    return result.affectedRows; 
  },
};

export default Producto;
