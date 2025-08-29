import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const AdminHome = () => {
  const [productos, setProductos] = useState([]);
  const [producto, setProducto] = useState({
    nombre: "",
    descripcion: "",
    marca_id: "",
    categoria_id: "",
  });
  const [mensaje, setMensaje] = useState("");
  const [editandoId, setEditandoId] = useState(null);

  // ===============================
  // Cargar productos
  // ===============================
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/productos`);
        setProductos(data);
      } catch (error) {
        console.error("Error al cargar productos:", error);
      }
    };
    fetchProductos();
  }, []);

  // ===============================
  // Crear / Editar producto
  // ===============================
  const handleAddProducto = async (e) => {
    e.preventDefault();
    try {
      if (editandoId) {
        await axios.put(`${API_URL}/productos/${editandoId}`, producto);
        setMensaje("Producto actualizado correctamente");
        setProductos((prev) =>
          prev.map((p) => (p.id === editandoId ? { ...p, ...producto } : p))
        );
      } else {
        const { data } = await axios.post(`${API_URL}/productos`, producto);
        setMensaje("Producto agregado correctamente");
        setProductos((prev) => [...prev, { ...producto, id: data.producto_id }]);
      }

      setProducto({ nombre: "", descripcion: "", marca_id: "", categoria_id: "" });
      setEditandoId(null);
    } catch (error) {
      console.error("Error al guardar producto:", error);
      setMensaje("Error al guardar producto");
    }
  };

  // ===============================
  // Editar producto
  // ===============================
  const handleEdit = (prod) => {
    setProducto(prod);
    setEditandoId(prod.id);
  };

  // ===============================
  // Eliminar producto
  // ===============================
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/productos/${id}`);
      setMensaje("Producto eliminado correctamente");
      setProductos((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Error al eliminar producto:", error);
      setMensaje("Error al eliminar producto");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Panel de Administración - Productos</h1>
      {mensaje && <p style={{ color: "green" }}>{mensaje}</p>}

      {/* FORMULARIO PRODUCTO */}
      <section>
        <h2>{editandoId ? "Editar Producto" : "Agregar Producto"}</h2>
        <form onSubmit={handleAddProducto}>
          <input
            type="text"
            placeholder="Nombre"
            value={producto.nombre}
            onChange={(e) => setProducto({ ...producto, nombre: e.target.value })}
            required
          />
          <textarea
            placeholder="Descripción"
            value={producto.descripcion}
            onChange={(e) => setProducto({ ...producto, descripcion: e.target.value })}
          />
          <input
            type="number"
            placeholder="ID Marca"
            value={producto.marca_id}
            onChange={(e) => setProducto({ ...producto, marca_id: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="ID Categoría"
            value={producto.categoria_id}
            onChange={(e) => setProducto({ ...producto, categoria_id: e.target.value })}
            required
          />
          <button type="submit">
            {editandoId ? "Actualizar" : "Agregar"} Producto
          </button>
        </form>
      </section>

      {/* LISTADO DE PRODUCTOS */}
      <section style={{ marginTop: "2rem" }}>
        <h2>Lista de Productos</h2>
        <ul>
          {productos.map((p) => (
            <li key={p.id}>
              <strong>{p.nombre}</strong> - {p.descripcion}  
              <button onClick={() => handleEdit(p)}>Editar</button>
              <button onClick={() => handleDelete(p.id)}>Eliminar</button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default AdminHome;
