const express = require('express');

const router = express.Router();

const usuarios = [];

router.post('/registro', (req, res) => {
  const { nombre, correo, password } = req.body;

  if (!nombre || !correo || !password) {
    return res.status(400).json({
      ok: false,
      mensaje: 'Todos los campos son obligatorios'
    });
  }

  const existe = usuarios.find(
    usuario => usuario.correo === correo
  );

  if (existe) {
    return res.status(409).json({
      ok: false,
      mensaje: 'El correo ya está registrado'
    });
  }

  usuarios.push({
    nombre,
    correo,
    password
  });

  return res.status(201).json({
    ok: true,
    mensaje: 'Usuario registrado correctamente'
  });
});

module.exports = router;