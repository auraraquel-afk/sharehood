const mongoose = require('mongoose'); 

// Colección "usuarios" según el modelo entidad-relación del Taller 1 
const usuarioSchema = new mongoose.Schema(  
    {    
        nombre: {     
             type: String,      
             required: true,      
             trim: true,    
            },   
             correo: {      
                type: String,      
                required: true,      
                unique: true, // no se pueden repetir correos      
                lowercase: true,      
                trim: true,   
             },   
              // Se guarda cifrada con bcrypt, nunca en texto plano (RNF09).   
              //  // select: false hace que no se devuelva en las consultas normales.   
               password: {      
                type: String,      
                required: true,      
                select: false,    
            },    
            barrio: {      
                type: String,      
                required: true,      
                trim: true,   
             },   
              telefono: {      
                type: String,     
                 default: '',   
                 },    
                 foto: {     
                     type: String,     
                      default: '',   
                     },   
                      promedioCalificacion: {      
                        type: Number,      
                        default: 0,
                        }, 
                     },
 { timestamps: true }, // agrega createdAt y updatedAt
 );
 // Datos del usuario que sí se pueden enviar a la app (sin la contraseña) 
 usuarioSchema.methods.datosPublicos = function () { 
    return {
        id: this._id, 
        nombre: this.nombre, 
        correo: this.correo, 
        barrio: this.barrio, 
        telefono: this.telefono, 
        foto: this.foto, 
        promedioCalificacion: this.promedioCalificacion, 
    }; 
}; 
module.exports = mongoose.model('Usuario', usuarioSchema);                   