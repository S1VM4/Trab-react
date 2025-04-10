import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom'; // Importar Link

const PacienteForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [paciente, setPaciente] = useState({
    nome: '',
    data_internacao: '',
    data_alta: '',
    status: '',
    diagnostico: '',
    observacoes: '',
  });

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3001/api/pacientes/${id}`)
        .then((res) => res.json())
        .then((data) => setPaciente(data))
        .catch((err) => console.error('Erro ao buscar paciente:', err));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaciente({ ...paciente, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const method = id ? 'PUT' : 'POST';
    const url = id
      ? `http://localhost:3001/api/pacientes/${id}`
      : 'http://localhost:3001/api/pacientes';

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(paciente),
    })
      .then(() => navigate('/'))
      .catch((err) => console.error('Erro ao salvar paciente:', err));
  };

  return (
    <div className="container">
      <h2 className="title">{id ? 'Editar Paciente' : 'Adicionar Paciente'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input
            type="text"
            name="nome"
            value={paciente.nome}
            onChange={handleChange}
            className="input"
            required
          />
        </div>
        <div>
          <label>Data de Internação:</label>
          <input
            type="date"
            name="data_internacao"
            value={paciente.data_internacao}
            onChange={handleChange}
            className="input"
            required
          />
        </div>
        <div>
          <label>Data de Alta:</label>
          <input
            type="date"
            name="data_alta"
            value={paciente.data_alta}
            onChange={handleChange}
            className="input"
          />
        </div>
        <div>
          <label>Status:</label>
          <input
            type="text"
            name="status"
            value={paciente.status}
            onChange={handleChange}
            className="input"
            required
          />
        </div>
        <div>
          <label>Diagnóstico:</label>
          <textarea
            name="diagnostico"
            value={paciente.diagnostico}
            onChange={handleChange}
            className="textarea"
          />
        </div>
        <div>
          <label>Observações:</label>
          <textarea
            name="observacoes"
            value={paciente.observacoes}
            onChange={handleChange}
            className="textarea"
          />
        </div>
        <button type="submit" className="button">
          {id ? 'Salvar Alterações' : 'Adicionar Paciente'}
        </button>
      </form>
      <Link to="/" className="button" style={{ marginTop: '10px', display: 'inline-block' }}>
        ← Voltar
      </Link>
    </div>
  );
};

export default PacienteForm;