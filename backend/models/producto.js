import pool from "../config/db.js";

const Producto = {
  // Obtener todos los productos con su marca y categoría
  getAll: async () => {
    const [rows] = await pool.query(
      `SELECT p.*, m.nombre AS marca, c.nombre AS categoria
       FROM productos p
       LEFT JOIN marcas m ON p.marca_id = m.id
       LEFT JOIN categorias c ON p.categoria_id = c.id`
    );
    return rows;
  },

  // Obtener producto por ID
  getById: async (id) => {
    const [rows] = await pool.query(
      `SELECT p.*, m.nombre AS marca, c.nombre AS categoria
       FROM productos p
       LEFT JOIN marcas m ON p.marca_id = m.id
       LEFT JOIN categorias c ON p.categoria_id = c.id
       WHERE p.id = ?`,
      [id]
    );
    return rows[0];
  },

  // Crear producto
  create: async (data) => {
    const { nombre, descripcion, precio, stock, marca_id, categoria_id, imagen } = data;

    const [result] = await pool.query(
      `INSERT INTO productos 
        (nombre, descripcion, precio, stock, marca_id, categoria_id, imagen) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [nombre, descripcion, precio, stock, marca_id, categoria_id, imagen]
    );

    return { id: result.insertId, ...data };
  },

  // Actualizar producto
  update: async (id, data) => {
    const { nombre, descripcion, precio, stock, marca_id, categoria_id, imagen } = data;

    if (imagen) {
      await pool.query(
        `UPDATE productos 
         SET nombre=?, descripcion=?, precio=?, stock=?, marca_id=?, categoria_id=?, imagen=? 
         WHERE id=?`,
        [nombre, descripcion, precio, stock, marca_id, categoria_id, imagen, id]
      );
    } else {
      await pool.query(
        `UPDATE productos 
         SET nombre=?, descripcion=?, precio=?, stock=?, marca_id=?, categoria_id=? 
         WHERE id=?`,
        [nombre, descripcion, precio, stock, marca_id, categoria_id, id]
      );
    }

    return { id, ...data };
  },

  // Eliminar producto
  delete: async (id) => {
    await pool.query("DELETE FROM productos WHERE id=?", [id]);
    return { message: "Producto eliminado correctamente" };
  },
};

export default Producto;
