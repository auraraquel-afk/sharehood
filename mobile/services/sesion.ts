import AsyncStorage from '@react-native-async-storage/async-storage';
import type {Usuario} from './authService';

// Guarda la sesión en el dispositivo (RNF08) para no pedir login cada vez
const CLAVE_SESION = 'sharehood_sesion';

export type Sesion = {
  token: string;
  usuario: Usuario;
};

export async function guardarSesion(sesion: Sesion): Promise<void> {
  await AsyncStorage.setItem(CLAVE_SESION, JSON.stringify(sesion));
}

export async function obtenerSesion(): Promise<Sesion | null> {
  try {
    const texto = await AsyncStorage.getItem(CLAVE_SESION);
    return texto ? (JSON.parse(texto) as Sesion) : null;
  } catch {
    return null;
  }
}

export async function cerrarSesion(): Promise<void> {
  await AsyncStorage.removeItem(CLAVE_SESION);
}
