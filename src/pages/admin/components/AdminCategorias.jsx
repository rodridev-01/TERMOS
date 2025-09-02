import React, { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash, FaTimes, FaThLarge } from "react-icons/fa";
import "./styles/AdminPanel.css";

function AdminCategorias() {
  const [categorias, setCategorias] = useState([]);
  const [form, setForm] = useState({ nombre: "", descripcion: "", imagen: null, imagenActual: null });
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const API_URL = "http://localhost:4000/api/categorias";

  useEffect(() => {
    fetch(API_URL)
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

       formData.append("type", "categorias");

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
        setCategorias(
          editingId
            ? categorias.map((c) => (c.id === editingId ? updated : c))
            : [...categorias, updated]
        );

        setForm({ nombre: "", descripcion: "", imagen: null, imagenActual: null });
        setEditingId(null);
        setShowModal(false);
      }
    } catch (error) {
      console.error("Error al guardar la categoría:", error);
    }
  };

  const handleEdit = (categoria) => {
    setForm({
      nombre: categoria.nombre,
      descripcion: categoria.descripcion,
      imagen: null,
      imagenActual: categoria.imagen,
    });
    setEditingId(categoria.id);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (res.ok) setCategorias(categorias.filter((c) => c.id !== id));
    } catch (error) {
      console.error("Error al eliminar la categoría:", error);
    }
  };

  return (
    <div className="admin-container">
      <div className="header-actions">
        <div className="title-group">
          <FaThLarge className="icon" />
          <h2>GESTIÓN DE CATEGORÍAS</h2>
        </div>
        <button
          className="btn-add"
          onClick={() => {
            setForm({ nombre: "", descripcion: "", imagen: null, imagenActual: null });
            setEditingId(null);
            setShowModal(true);
          }}
        >
          <FaPlus /> Agregar Categoría
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowModal(false)}>
              <FaTimes />
            </button>
            <form onSubmit={handleSubmit} className="form-marcas">
              <input type="hidden" name="type" value="categorias" />
              <input
                type="text"
                name="nombre"
                placeholder="Nombre de la categoría"
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
                <FaPlus /> {editingId ? "Actualizar Categoría" : "Crear Categoría"}
              </button>
            </form>
          </div>
        </div>
      )}

      {showConfirm && (
        <div className="modal-overlay" onClick={() => setShowConfirm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>¿Estás seguro de que quieres eliminar esta categoría?</h3>
            <div className="confirm-actions">
              <div className="marca-actions">
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
        </div>
      )}

      <div className="marcas-grid">
        {categorias.map((c) => (
          <div className="marca-card" key={c.id}>
            {c.imagen ? (
              <img
                src={`http://localhost:3000${c.imagen}`}
                alt={c.nombre}
                className="marca-logo"
              />
            ) : (
              <div className="no-logo">Sin imagen</div>
            )}
            <div className="marca-info">
              <h3>{c.nombre}</h3>
              <p>{c.descripcion}</p>
              <div className="marca-actions">
                <button onClick={() => handleEdit(c)} className="btn-edit">
                  <FaEdit /> Editar
                </button>
                <button
                  onClick={() => {
                    setDeleteId(c.id);
                    setShowConfirm(true);
                  }}
                  className="btn-delete"
                >
                  <FaTrash /> Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminCategorias;
