
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

type LoginScreenProps = {
  onIrARegistro: () => void;
  onLoginExitoso: (usuario?: any) => void;
};

// Cambia 10.0.2.2 por tu IPv4 si pruebas en un celular físico en la misma Wi-Fi
const API_LOGIN = 'http://10.0.2.2:3000/api/login';

const LoginScreen = ({ onIrARegistro, onLoginExitoso }: LoginScreenProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cargando, setCargando] = useState(false);

  const handleLogin = async () => {
    if (cargando) return;

    const correoLimpio = email.trim().toLowerCase();

    if (!correoLimpio || !password) {
      Alert.alert('⚠️ Atención', 'Por favor completa todos los campos');
      return;
    }

    if (!correoLimpio.includes('@')) {
      Alert.alert('⚠️ Correo inválido', 'Ingresa un correo válido');
      return;
    }

    setCargando(true);

    try {
      const respuesta = await fetch(API_LOGIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          correo: correoLimpio,
          email: correoLimpio,
          contrasena: password,
          password,
        }),
      });

      const resultado = await respuesta.json();

      if (!respuesta.ok) {
        Alert.alert(
          '⚠️ Error al iniciar sesión',
          resultado.mensaje || resultado.message || 'Credenciales incorrectas',
        );
        return;
      }

      setPassword('');
      onLoginExitoso(resultado.usuario || resultado);
    } catch (error) {
      Alert.alert(
        '⚠️ Error de conexión',
        'No se pudo conectar con el servidor. Verifica que el backend esté encendido.',
      );
    } finally {
      setCargando(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Iniciar Sesión</Text>

      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity
        style={[styles.boton, cargando && styles.botonDeshabilitado]}
        onPress={handleLogin}
        disabled={cargando}
      >
        {cargando ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.textoBoton}>Ingresar</Text>
        )}
      </TouchableOpacity>

      <View style={styles.registroContainer}>
        <Text style={styles.textoRegistro}>¿No tienes cuenta?</Text>
        <TouchableOpacity onPress={onIrARegistro}>
          <Text style={styles.enlaceRegistro}>Crear cuenta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 25,
    backgroundColor: '#fff',
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 35,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  boton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  botonDeshabilitado: {
    opacity: 0.7,
  },
  textoBoton: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  registroContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    gap: 6,
  },
  textoRegistro: {
    fontSize: 14,
    color: '#666',
  },
  enlaceRegistro: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2196F3',
  },
});

export default LoginScreen;