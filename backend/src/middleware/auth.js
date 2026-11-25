const jwt = require('jsonwebtoken'); 
// Protege rutas: solo deja pasar peticiones con un token JWT válido. 
// // La app debe enviar el encabezado:  Authorization: Bearer <token> 
function verificarToken(req, res, next) { 
    const encabezado = req.headers.authorization || ''; 
    const [tipo, token] = encabezado.split(' '); 
    
    if (tipo !== 'Bearer' || !token) { 
        return res.status(401).json({ ok: false, mensaje: 'Debes iniciar sesión' }); 
    }

    try { 
        const datos = jwt.verify(token, process.env.JWT_SECRET); 
        req.usuarioId = datos.id; // queda disponible para el controlador 
        return next(); 
    } catch (error) { 
        return res.status(401).json({ 
            ok: false, 
            mensaje: 'La sesión expiró, inicia sesión de nuevo', 
        });
     } 
    } 
    module.exports = verificarToken;