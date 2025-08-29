import React, { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import "./styles/AdminMarcas.css";

function AdminMarcas() {
  const [marcas, setMarcas] = useState([]);
  const [form, setForm] = useState({ nombre: "", descripcion: "", logo: null });
  const [editingId, setEditingId] = useState(null);
  const API_URL = "http://localhost:4000/marca";

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setMarcas(data))
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleFileChange = (e) => setForm({ ...form, logo: e.target.files[0] });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("nombre", form.nombre);
      formData.append("descripcion", form.descripcion);
      if (form.logo) formData.append("logo", form.logo);

      const res = await fetch(editingId ? `${API_URL}/${editingId}` : API_URL, {
        method: editingId ? "PUT" : "POST",
        body: formData,
      });

      if (res.ok) {
        const updated = await res.json();
        setMarcas(editingId ? marcas.map((m) => (m.id === editingId ? updated : m)) : [...marcas, updated]);
        setForm({ nombre: "", descripcion: "", logo: null });
        setEditingId(null);
      }
    } catch (error) {
      console.error("Error al guardar la marca:", error);
    }
  };

  const handleEdit = (marca) => {
    setForm({ nombre: marca.nombre, descripcion: marca.descripcion, logo: null });
    setEditingId(marca.id);
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (res.ok) setMarcas(marcas.filter((m) => m.id !== id));
    } catch (error) {
      console.error("Error al eliminar la marca:", error);
    }
  };

  return (
    <div className="admin-container">
      <h2>Gestión de Marcas</h2>

      <form onSubmit={handleSubmit} className="form-marcas">
        <input
          type="text"
          name="nombre"
          placeholder="Nombre de la marca"
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
        <input type="file" name="logo" onChange={handleFileChange} accept="image/*" />

        <button type="submit">
          <FaPlus /> {editingId ? "Actualizar Marca" : "Crear Marca"}
        </button>
      </form>

      <div className="marcas-grid">
        {marcas.map((m) => (
          <div className="marca-card" key={m.id}>
            {m.logo ? (
              <img src={`http://localhost:3000${m.logo}`} alt={m.nombre} className="marca-logo" />
            ) : (
              <div className="no-logo">Sin logo</div>
            )}
            <div className="marca-info">
              <h3>{m.nombre}</h3>
              <p>{m.descripcion}</p>
              <div className="marca-actions">
                <button onClick={() => handleEdit(m)} className="btn-edit">
                  <FaEdit /> Editar
                </button>
                <button onClick={() => handleDelete(m.id)} className="btn-delete">
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

export default AdminMarcas;
