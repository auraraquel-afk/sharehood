import {API_BASE_URL} from '../config.ts';
import type {DatosRegistro} from '../screens/RegistroScreen';

export type Usuario = {
  id: string;
  nombre: string;
  correo: string;
  barrio: string;
  telefono?: string;
  foto?: string;
  promedioCalificacion?: number;
};

type RespuestaLogin = {
  token: string;
  usuario: Usuario;
};

// Hace la petición y convierte cualquier falla en un mensaje claro
async function pedir<T>(ruta: string, opciones: RequestInit): Promise<T> {
  let respuesta: Response;

  try {
    respuesta = await fetch(`${API_BASE_URL}${ruta}`, {
      ...opciones,
      headers: {
        'Content-Type': 'application/json',
        ...(opciones.headers || {}),
      },
    });
  } catch {
    // fetch solo falla así cuando no hay red o el servidor está apagado (RNF10)
    throw new Error(
      'No hay conexión con el servidor. Revisa tu internet e inténtalo de nuevo.',
    );
  }

  // Si el servidor no responde JSON, evitamos que la app se rompa
  const resultado = await respuesta.json().catch(() => ({}));

  if (!respuesta.ok) {
    throw new Error(resultado.mensaje || 'Ocurrió un error, inténtalo de nuevo.');
  }

  return resultado as T;
}

// HU01 - Registro.
// La pantalla usa "nombreCompleto" y "contrasena"; la API espera "nombre" y "password".
export function registrarUsuario(datos: DatosRegistro) {
  return pedir<{mensaje: string; usuario: Usuario}>('/registro', {
    method: 'POST',
    body: JSON.stringify({
      nombre: datos.nombreCompleto,
      correo: datos.correo,
      barrio: datos.barrio,
      password: datos.contrasena,
    }),
  });
}

// HU02 - Inicio de sesión
export function iniciarSesion(correo: string, password: string) {
  return pedir<RespuestaLogin>('/login', {
    method: 'POST',
    body: JSON.stringify({correo, password}),
  });
}
