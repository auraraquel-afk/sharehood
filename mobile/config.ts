// Dirección de la API en un solo lugar.
// - Emulador Android: 10.0.2.2 apunta al computador donde corre el backend.
// - Simulador iOS: usa http://localhost:3000/api
// - Celular físico: usa la IPv4 del computador (ej. http://192.168.1.10:3000/api)
//   y que ambos estén en la misma red Wi-Fi.
export const API_BASE_URL = 'http://10.0.2.2:3000/api';