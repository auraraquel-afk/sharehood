import { useState } from 'react';
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

export type DatosRegistro = {
  nombreCompleto: string;
  correo: string;
  barrio: string;
  contrasena: string;
};

type Props = {
  onVolverAInicioSesion?: () => void;
  onRegistroValido?: (datos: DatosRegistro) => void;
  cargando?: boolean;
};

export default function RegistroScreen({
  onVolverAInicioSesion,
  onRegistroValido,
  cargando = false,
}: Props) {
  const [nombreCompleto, setNombreCompleto] = useState('');
  const [correo, setCorreo] = useState('');
  const [barrio, setBarrio] = useState('');
  const [contrasena, setContrasena] = useState('');

  const manejarRegistro = () => {
    if (cargando) {
      return;
    }

    if (
      !nombreCompleto.trim() ||
      !correo.trim() ||
      !barrio.trim() ||
      !contrasena
    ) {
      Alert.alert('Faltan datos', 'Completa todos los campos para continuar.');
      return;
    }

    const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.trim());

    if (!correoValido) {
      Alert.alert('Correo no válido', 'Revisa el correo que escribiste.');
      return;
    }

    if (contrasena.length < 8) {
      Alert.alert(
        'Contraseña muy corta',
        'La contraseña debe tener mínimo 8 caracteres.',
      );
      return;
    }

    const datos: DatosRegistro = {
      nombreCompleto: nombreCompleto.trim(),
      correo: correo.trim().toLowerCase(),
      barrio: barrio.trim(),
      contrasena,
    };

    if (onRegistroValido) {
      onRegistroValido(datos);
    } else {
      Alert.alert(
        'Formulario válido',
        'Los datos están completos. Falta conectar el registro para guardar la cuenta.',
      );
    }
  };

  const volverAInicioSesion = () => {
    if (onVolverAInicioSesion) {
      onVolverAInicioSesion();
    } else {
      Alert.alert(
        'Navegación pendiente',
        'Al conectar las pantallas, este botón volverá a Iniciar sesión.',
      );
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.pantalla}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.contenido}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Volver a iniciar sesión"
          onPress={volverAInicioSesion}
          style={styles.botonAtras}
        >
          <Text style={styles.flecha}>‹</Text>
        </Pressable>

        <Text style={styles.titulo}>Crear cuenta</Text>
        <Text style={styles.subtitulo}>Únete a la comunidad de tu barrio</Text>

        <Text style={styles.etiqueta}>Nombre completo</Text>
        <TextInput
          style={styles.campo}
          placeholder="Ej. Laura Mina"
          placeholderTextColor="#8A9A97"
          value={nombreCompleto}
          onChangeText={setNombreCompleto}
          autoCapitalize="words"
          accessibilityLabel="Nombre completo"
        />

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

        <Text style={styles.etiqueta}>Barrio</Text>
        <TextInput
          style={styles.campo}
          placeholder="Escribe tu barrio"
          placeholderTextColor="#8A9A97"
          value={barrio}
          onChangeText={setBarrio}
          accessibilityLabel="Barrio"
        />

        <Text style={styles.etiqueta}>Contraseña</Text>
        <TextInput
          style={styles.campo}
          placeholder="Mínimo 8 caracteres"
          placeholderTextColor="#8A9A97"
          value={contrasena}
          onChangeText={setContrasena}
          secureTextEntry
          autoCapitalize="none"
          accessibilityLabel="Contraseña"
        />

        <Pressable
          accessibilityRole="button"
          onPress={manejarRegistro}
          disabled={cargando}
          style={({ pressed }) => [
            styles.botonRegistro,
            (pressed || cargando) && styles.botonPresionado,
          ]}
        >
          {cargando ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.textoBoton}>Registrarme</Text>
          )}
        </Pressable>

        <Text style={styles.terminos}>
          Al registrarte aceptas los términos de uso.
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  pantalla: {
    flex: 1,
    backgroundColor: '#F2FBF8',
  },
  contenido: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 32,
  },
  botonAtras: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    marginBottom: 12,
  },
  flecha: {
    color: '#146D66',
    fontSize: 32,
    lineHeight: 36,
  },
  titulo: {
    color: '#123F3B',
    fontSize: 27,
    fontWeight: '700',
  },
  subtitulo: {
    color: '#536C68',
    fontSize: 15,
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
  botonRegistro: {
    height: 50,
    borderRadius: 11,
    backgroundColor: '#0F776F',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 22,
  },
  botonPresionado: {
    opacity: 0.8,
  },
  textoBoton: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  terminos: {
    color: '#6A7C78',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 14,
  },
});
