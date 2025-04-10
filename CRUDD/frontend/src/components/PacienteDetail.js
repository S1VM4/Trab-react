import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const PacienteDetail = () => {
  const { id } = useParams();
  const [paciente, setPaciente] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3001/api/pacientes/${id}`)
      .then((res) => res.json())
      .then((data) => setPaciente(data))
      .catch((err) => console.error('Erro ao buscar paciente:', err));
  }, [id]);

  const formatDate = (date) => {
    if (!date || date === '1899-11-30T03:06:28.000Z') {
      return 'Não aplicável';
    }
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  if (!paciente) return <div className="container">Carregando...</div>;

  return (
    <div className="container">
      <h2 className="title">Detalhes do Paciente</h2>
      <div>
        <p><strong>Nome:</strong> {paciente.nome}</p>
        <p><strong>Internado em:</strong> {formatDate(paciente.data_internacao)}</p>
        <p><strong>Alta em:</strong> {formatDate(paciente.data_alta)}</p>
        <p><strong>Status:</strong> {paciente.status}</p>
        <p><strong>Diagnóstico:</strong> {paciente.diagnostico}</p>
        <p><strong>Observações:</strong> {paciente.observacoes}</p>
      </div>
      <Link to="/" className="button" style={{ marginTop: '10px', display: 'inline-block' }}>
        ← Voltar
      </Link>
    </div>
  );
};

export default PacienteDetail;