import React, { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash, FaTimes, FaThLarge } from "react-icons/fa";
import "./styles/AdminPanel.css";

function AdminProductos() {
  const [productos, setProductos] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    stock: "",
    marca_id: "",
    categoria_id: "",
    imagen: null,
    imagenActual: null,
  });
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const API_URL = "http://localhost:4000/api/productos";
  const API_MARCAS = "http://localhost:4000/api/marcas";
  const API_CATEGORIAS = "http://localhost:4000/api/categorias";

  useEffect(() => {
    // Traer productos
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setProductos(data))
      .catch((err) => console.error(err));

    // Traer marcas
    fetch(API_MARCAS)
      .then((res) => res.json())
      .then((data) => setMarcas(data))
      .catch((err) => console.error(err));

    // Traer categorías
    fetch(API_CATEGORIAS)
      .then((res) => res.json())
      .then((data) => setCategorias(data))
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleFileChange = (e) =>
    setForm({ ...form, imagen: e.target.files[0] });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("nombre", form.nombre);
      formData.append("descripcion", form.descripcion);
      formData.append("precio", form.precio);
      formData.append("stock", form.stock);
      formData.append("marca_id", form.marca_id);
      formData.append("categoria_id", form.categoria_id);
      formData.append("type", "productos");

      if (form.imagen) {
        formData.append("imagen", form.imagen);
      } else if (form.imagenActual) {
        formData.append("imagenActual", form.imagenActual);
      }

      const res = await fetch(
        editingId ? `${API_URL}/${editingId}` : API_URL,
        {
          method: editingId ? "PUT" : "POST",
          body: formData,
        }
      );

    if (res.ok) {
      const updated = await res.json();

      // Agregar nombre de marca y categoría usando los arrays locales
      const marca = marcas.find((m) => m.id === Number(updated.marca_id))?.nombre || "";
      const categoria = categorias.find((c) => c.id === Number(updated.categoria_id))?.nombre || "";

      const productoConNombres = { ...updated, marca, categoria };

      setProductos(
        editingId
          ? productos.map((p) => (p.id === editingId ? productoConNombres : p))
          : [...productos, productoConNombres]
      );

      setForm({
        nombre: "",
        descripcion: "",
        precio: "",
        stock: "",
        marca_id: "",
        categoria_id: "",
        imagen: null,
        imagenActual: null,
      });
      setEditingId(null);
      setShowModal(false);
    }

    } catch (error) {
      console.error("Error al guardar el producto:", error);
    }
  };

  const handleEdit = (producto) => {
    setForm({
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: producto.precio,
      stock: producto.stock,
      marca_id: producto.marca_id,
      categoria_id: producto.categoria_id,
      imagen: null,
      imagenActual: producto.imagen,
    });
    setEditingId(producto.id);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (res.ok) setProductos(productos.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  };

  return (
    <div className="admin-container">
      <div className="header-actions">
        <div className="title-group">
          <FaThLarge className="icon" />
          <h2>GESTIÓN DE PRODUCTOS</h2>
        </div>
        <button
          className="btn-add"
          onClick={() => {
            setForm({
              nombre: "",
              descripcion: "",
              precio: "",
              stock: "",
              marca_id: "",
              categoria_id: "",
              imagen: null,
              imagenActual: null,
            });
            setEditingId(null);
            setShowModal(true);
          }}
        >
          <FaPlus /> Agregar Producto
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => setShowModal(false)}
            >
              <FaTimes />
            </button>
            <form onSubmit={handleSubmit} className="form-marcas">
              <input type="hidden" name="type" value="productos" />
              <input
                type="text"
                name="nombre"
                placeholder="Nombre del producto"
                value={form.nombre}
                onChange={handleChange}
                required
              />
              <textarea
                name="descripcion"
                placeholder="Descripción"
                value={form.descripcion}
                onChange={handleChange}
              />
              <input
                type="number"
                step="0.01"
                name="precio"
                placeholder="Precio"
                value={form.precio}
                onChange={handleChange}
                required
              />
              <input
                type="number"
                name="stock"
                placeholder="Stock"
                value={form.stock}
                onChange={handleChange}
                required
              />

              {/* Combobox Marcas */}
              <select
                name="marca_id"
                value={form.marca_id}
                onChange={handleChange}
                required
              >
                <option value="">Selecciona una marca</option>
                {marcas.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.nombre}
                  </option>
                ))}
              </select>

              {/* Combobox Categorías */}
              <select
                name="categoria_id"
                value={form.categoria_id}
                onChange={handleChange}
                required
              >
                <option value="">Selecciona una categoría</option>
                {categorias.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.nombre}
                  </option>
                ))}
              </select>

              <input
                type="file"
                name="imagen"
                onChange={handleFileChange}
                accept="image/*"
              />

              {(form.imagenActual || form.imagen) && (
                <div className="preview-container">
                  <p>Imagen actual:</p>
                  <img
                    src={
                      form.imagen
                        ? URL.createObjectURL(form.imagen)
                        : `http://localhost:3000${form.imagenActual}`
                    }
                    alt="Vista previa"
                    className="preview-img"
                  />
                </div>
              )}

              <button type="submit">
                <FaPlus />{" "}
                {editingId ? "Actualizar Producto" : "Crear Producto"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Confirmación */}
      {showConfirm && (
        <div className="modal-overlay" onClick={() => setShowConfirm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>¿Estás seguro de que quieres eliminar este producto?</h3>
            <div className="confirm-actions">
              <button
                className="btn-confirm"
                onClick={() => {
                  handleDelete(deleteId);
                  setShowConfirm(false);
                  setDeleteId(null);
                }}
              >
                Sí, eliminar
              </button>
              <button
                className="btn-cancel"
                onClick={() => {
                  setShowConfirm(false);
                  setDeleteId(null);
                }}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="productos-table-container">
        <table className="productos-table">
          <thead>
            <tr>
              <th></th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Precio (S/)</th>
              <th>Stock</th>
              <th>Marca</th>
              <th>Categoría</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((p) => (
              <tr key={p.id}>
                <td>
                  {p.imagen ? (
                    <img
                      src={`http://localhost:3000${p.imagen}`}
                      alt={p.nombre}
                      className="producto-img"
                    />
                  ) : (
                    <span>Sin imagen</span>
                  )}
                </td>
                <td>{p.nombre}</td>
                <td>{p.descripcion}</td>
                <td>{p.precio}</td>
                <td>{p.stock}</td>
                <td>{p.marca}</td>
                <td>{p.categoria}</td>
                <td>
                  <button onClick={() => handleEdit(p)} className="btn-edit">
                    <FaEdit /> Editar
                  </button>
                  <button
                    onClick={() => {
                      setDeleteId(p.id);
                      setShowConfirm(true);
                    }}
                    className="btn-delete"
                  >
                    <FaTrash /> Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default AdminProductos;
