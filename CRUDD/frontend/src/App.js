import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import PacientesList from './components/PacientesList';
import PacienteForm from './components/PacienteForm';
import PacienteDetail from './components/PacienteDetail';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <header className="header">
        <h1>Hospital XYZ</h1>
        <p>Desenvolvido por Andrei Silva Martins</p>
      </header>
      <Routes>
        <Route path="/" element={<PacientesList />} />
        <Route path="/novo" element={<PacienteForm />} />
        <Route path="/editar/:id" element={<PacienteForm />} />
        <Route path="/detalhes/:id" element={<PacienteDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;