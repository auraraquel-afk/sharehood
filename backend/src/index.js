require('dotenv').config(); 

const express = require('express'); 
const cors = require('cors'); 
const conectarDB = require('./config/db'); 
const authRoutes = require('./routes/authRoutes'); 

const app = express();


app.use(cors()); 
app.use(express.json()); 

app.get('/api/health', (req, res) => { 
  res.json({ 
    status: 'ok', 
    app: 'ShareHood API', 
  }); 
});
app.use('/api', authRoutes); 
// Ruta que no existe: responde en JSON (no en HTML) para que la app lo entienda 
app.use((req, res) => { 
  res.status(404).json({ ok: false, mensaje: 'Ruta no encontrada' }); 
}); 
// Cualquier error no controlado termina aquí 
app.use((err, req, res, next) => { 
  if (err.type === 'entity.parse.failed') { 
    return res.status(400).json({ ok: false, mensaje: 'JSON mal formado' }); 
  } 
  console.error(err); 
  res.status(500).json({ ok: false, mensaje: 'Error interno del servidor' }); 
}); 
const PORT = process.env.PORT || 3000; 

async function iniciar() { 
  if (!process.env.JWT_SECRET) { 
    throw new Error('Falta JWT_SECRET en el archivo .env'); 
  }
  await conectarDB(); 
  
  app.listen(PORT, () => { 
    console.log('API ShareHood en puerto ' + PORT); 
  }); 
} 
iniciar().catch(error => { 
  console.error('No se pudo iniciar la API:', error.message);
   process.exit(1); 
  });