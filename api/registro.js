const pool = require('./ll/_db');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Falta usuario o contraseña' });
  }

  try {
    await pool.query(
      'INSERT INTO usuarios (username, password) VALUES ($1, $2)',
      [username, password]
    );
    res.json({ ok: true, mensaje: 'Usuario registrado correctamente' });
  } catch (err) {
    if (err.code === '23505') {
      return res.status(409).json({ error: 'Ese usuario ya existe' });
    }
    console.error(err);
    res.status(500).json({ error: 'Error del servidor' });
  }
};
