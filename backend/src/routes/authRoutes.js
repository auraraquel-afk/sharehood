const express = require('express'); 
const { registro, login, perfil } = require('../controllers/authController'); 
const verificarToken = require('../middleware/auth'); 

const router = express.Router(); 

router.post('/registro', registro); // HU01 
router.post('/login', login); // HU02 
router.get('/perfil', verificarToken, perfil); // ruta protegida con JWT 

module.exports = router;