const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken'); 
const Usuario = require('../models/Usuario');

const CORREO_VALIDO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Crea el token JWT que la app guarda y envía en cada petición
function generarToken(usuario) { 
    return jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { 
        expiresIn: process.env.JWT_EXPIRES_IN || '7d', 
    }); 
}
// HU01 - Registro
// POST /api/registro  body: { nombre, correo, barrio, password }
async function registro(req, res) {
    const nombre = (req.body.nombre || '').trim(); 
    const correo = (req.body.correo || '').trim().toLowerCase(); 
    const barrio = (req.body.barrio || '').trim(); 
    const password = req.body.password || '';

    if (!nombre || !correo || !barrio || !password) { 
        return res.status(400).json({ 
            ok: false, 
            mensaje: 'Todos los campos son obligatorios', 
        }); 
    } 
    if (!CORREO_VALIDO.test(correo)) { 
        return res.status(400).json({ ok: false, mensaje: 'El correo no es válido' });
         } 
          if (password.length < 8) {   
             return res.status(400).json({      
                ok: false,      
                mensaje: 'La contraseña debe tener mínimo 8 caracteres',   
             });  
            }
             const existe = await Usuario.findOne({ correo });  
             if (existe) {    
                return res.status(409).json({     
                     ok: false,      
                     mensaje: 'El correo ya está registrado',    
                    });  
                }  
                // Cifra la contraseña antes de guardarla (RNF09)  
                const passwordCifrada = await bcrypt.hash(password, 10);  
                try {    
                    const usuario = await Usuario.create({      
                        nombre,      
                        correo,     
                        barrio,     
                        password: passwordCifrada,    
                    });    
                    return res.status(201).json({     
                         ok: true,      
                         mensaje: 'Usuario registrado correctamente',     
                          usuario: usuario.datosPublicos(),    
                        }); 
                     } catch (error) {    
                        // 11000 = correo duplicado (si dos personas se registran al mismo tiempo)   
                         if (error.code === 11000) {      
                            return res.status(409).json({       
                                 ok: false,        
                                 mensaje: 'El correo ya está registrado',     
                                 });    
                                }   
                                 throw error; 
                                 } 
                                } 
                                // HU02 - Inicio de sesión 
                                // // POST /api/login  body: { correo, password } 
                                async function login(req, res) {  
                                    const correo = (req.body.correo || '').trim().toLowerCase();  
                                    const password = req.body.password || '';  
                                    
                                    if (!correo || !password) {    
                                        return res.status(400).json({     
                                             ok: false,     
                                              mensaje: 'Correo y contraseña son obligatorios',   
                                             });  
                                            }  
                                            // +password porque en el modelo está oculta por defecto  
                                            const usuario = await Usuario.findOne({ correo }).select('+password');

                                            // Mismo mensaje si no existe el correo o si la contraseña está mal, 
                                            // // para no revelar qué correos están registrados
                                            const passwordCorrecta = 
                                            usuario && (await bcrypt.compare(password, usuario.password));
                                            if (!passwordCorrecta) { 
                                                return res.status(401).json({ 
                                                    ok: false, 
                                                    mensaje: 'Correo o contraseña incorrectos', 
                                                }); 
                                            }
                                            return res.json({ 
                                                ok: true, 
                                                mensaje: 'Inicio de sesión exitoso', 
                                                token: generarToken(usuario), 
                                                usuario: usuario.datosPublicos(), 
                                            }); 
                                        }
                                        // GET /api/perfil  (requiere token) - sirve para comprobar la sesión guardada 
                                        async function perfil(req, res) { 
                                            const usuario = await Usuario.findById(req.usuarioId); 
                                            
                                            if (!usuario) { 
                                                return res.status(404).json({ ok: false, mensaje: 'Usuario no encontrado' }); 
                                            } 
                                            return res.json({ ok: true, usuario: usuario.datosPublicos() }); 
                                        }
                                         module.exports = { registro, login, perfil };