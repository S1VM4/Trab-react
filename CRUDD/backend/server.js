const express = require('express');
const cors = require('cors');
const app = express();
const pacientesRoutes = require('./pacientes.routes');

app.use(cors());
app.use(express.json());

app.use('/api', pacientesRoutes);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
