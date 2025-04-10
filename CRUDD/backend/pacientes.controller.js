const db = require('./db');

exports.getAll = (req, res) => {
  db.query('SELECT * FROM pacientes', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

exports.getById = (req, res) => {
  db.query('SELECT * FROM pacientes WHERE id = ?', [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results[0]);
  });
};

exports.create = (req, res) => {
  const { nome, data_internacao, data_alta, diagnostico, status, observacoes } = req.body;
  db.query(
    'INSERT INTO pacientes (nome, data_internacao, data_alta, diagnostico, status, observacoes) VALUES (?, ?, ?, ?, ?, ?)',
    [nome, data_internacao, data_alta, diagnostico, status, observacoes],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ id: result.insertId, ...req.body });
    }
  );
};

exports.update = (req, res) => {
  const { nome, data_internacao, data_alta, diagnostico, status, observacoes } = req.body;
  db.query(
    'UPDATE pacientes SET nome=?, data_internacao=?, data_alta=?, diagnostico=?, status=?, observacoes=? WHERE id=?',
    [nome, data_internacao, data_alta, diagnostico, status, observacoes, req.params.id],
    (err) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ id: req.params.id, ...req.body });
    }
  );
};

exports.delete = (req, res) => {
  db.query('DELETE FROM pacientes WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Paciente removido' });
  });
};
