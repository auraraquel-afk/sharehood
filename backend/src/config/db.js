const mongoose = require('mongoose');
// Conecta la API con MongoDB usando la cadena del archivo .env
async function conectarDB() { 
    const uri = process.env.MONGODB_URI;
     if (!uri) {    
        throw new Error('Falta MONGODB_URI en el archivo .env');  
    }  
    await mongoose.connect(uri);  
    console.log('Conectado a MongoDB'); 
} 
module.exports = conectarDB; 