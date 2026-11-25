
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import {iniciarSesion} from '../services/authService';
import type {Sesion} from '../services/sesion';

type LoginScreenProps = {
  onIrARegistro: () => void;
  onLoginExitoso: (sesion: Sesion) => void;
};

const CORREO_VALIDO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// HU02 - Inicio de sesión (diseño según el mockup del Taller 1)
const LoginScreen = ({onIrARegistro, onLoginExitoso}: LoginScreenProps) => {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [cargando, setCargando] = useState(false);

  const handleLogin = async () => {
    if (cargando) {
      return;
    }

    const correoLimpio = correo.trim().toLowerCase();

    if (!correoLimpio || !password) {
      Alert.alert('Faltan datos', 'Escribe tu correo y tu contraseña.');
      return;
    }

    if (!CORREO_VALIDO.test(correoLimpio)) {
      Alert.alert('Correo no válido', 'Revisa el correo que escribiste.');
      return;
    }

    setCargando(true);

    try {
      const {token, usuario} = await iniciarSesion(correoLimpio, password);
      setPassword('');
      onLoginExitoso({token, usuario});
    } catch (error) {
      Alert.alert(
        'No pudiste iniciar sesión',
        error instanceof Error ? error.message : 'Inténtalo de nuevo.',
      );
    } finally {
      setCargando(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.pantalla}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView
        contentContainerStyle={styles.contenido}
        keyboardShouldPersistTaps="handled">
        <View style={styles.logo}>
          <Text style={styles.logoTexto}>SH</Text>
        </View>

        <Text style={styles.titulo}>Bienvenido de nuevo</Text>
        <Text style={styles.subtitulo}>
          Inicia sesión para ver lo que comparten tus vecinos
        </Text>

        <Text style={styles.etiqueta}>Correo electrónico</Text>
        <TextInput
          style={styles.campo}
          placeholder="vecino@correo.com"
          placeholderTextColor="#8A9A97"
          value={correo}
          onChangeText={setCorreo}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          accessibilityLabel="Correo electrónico"
        />

        <Text style={styles.etiqueta}>Contraseña</Text>
        <TextInput
          style={styles.campo}
          placeholder="••••••••"
          placeholderTextColor="#8A9A97"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
          accessibilityLabel="Contraseña"
        />

        <Pressable
          onPress={() =>
            Alert.alert('Próximamente', 'La recuperación de contraseña llegará en otra versión.')
          }
          style={styles.olvido}>
          <Text style={styles.enlace}>¿Olvidaste tu contraseña?</Text>
        </Pressable>

        <Pressable
          accessibilityRole="button"
          onPress={handleLogin}
          disabled={cargando}
          style={({pressed}) => [
            styles.boton,
            (pressed || cargando) && styles.botonPresionado,
          ]}>
          {cargando ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.textoBoton}>Iniciar sesión</Text>
          )}
        </Pressable>

        <View style={styles.registro}>
          <Text style={styles.textoRegistro}>¿No tienes cuenta? </Text>
          <Pressable onPress={onIrARegistro} hitSlop={10}>
            <Text style={styles.enlace}>Regístrate</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

// Mismos colores de RegistroScreen para que las pantallas se vean iguales
const styles = StyleSheet.create({
  pantalla: {
    flex: 1,
    backgroundColor: '#F2FBF8',
  },
  contenido: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  logo: {
    alignSelf: 'center',
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#0F776F',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  logoTexto: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '800',
  },
  titulo: {
    color: '#123F3B',
    fontSize: 27,
    fontWeight: '700',
    textAlign: 'center',
  },
  subtitulo: {
    color: '#536C68',
    fontSize: 15,
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 20,
  },
  etiqueta: {
    color: '#244A46',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
    marginTop: 10,
  },
  campo: {
    height: 48,
    borderWidth: 1,
    borderColor: '#D4E5E0',
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    color: '#183B37',
    fontSize: 15,
  },
  olvido: {
    alignSelf: 'flex-end',
    marginTop: 10,
    minHeight: 44,
    justifyContent: 'center',
  },
  enlace: {
    color: '#0F776F',
    fontSize: 14,
    fontWeight: '700',
  },
  boton: {
    height: 50,
    borderRadius: 11,
    backgroundColor: '#0F776F',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  botonPresionado: {
    opacity: 0.8,
  },
  textoBoton: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  registro: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  textoRegistro: {
    color: '#536C68',
    fontSize: 14,
  },
});

export default LoginScreen;
