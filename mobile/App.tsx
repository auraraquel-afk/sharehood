import React, {useState} from 'react';
import {
  FlatList,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

type Objeto = {
  id: string;
  nombre: string;
  lugar: string;
  categoria: string;
  tipo: 'Préstamo' | 'Trueque';
  color: string;
};

const OBJETOS: Objeto[] = [
  {id: '1', nombre: 'Taladro Bosch', lugar: 'El Ingenio · 300 m', categoria: 'Herramientas', tipo: 'Préstamo', color: '#14B8A6'},
  {id: '2', nombre: 'Carpa 4 personas', lugar: 'Ciudad Jardín · 1 km', categoria: 'Camping', tipo: 'Trueque', color: '#F59E0B'},
  {id: '3', nombre: 'Escalera 2 m', lugar: 'El Ingenio · 500 m', categoria: 'Hogar', tipo: 'Préstamo', color: '#0F766E'},
  {id: '4', nombre: 'Libros de cocina', lugar: 'Pance · 2 km', categoria: 'Libros', tipo: 'Trueque', color: '#5EEAD4'},
  {id: '5', nombre: 'Pulidora', lugar: 'El Ingenio · 200 m', categoria: 'Herramientas', tipo: 'Préstamo', color: '#14B8A6'},
  {id: '6', nombre: 'Mesa plegable', lugar: 'Ciudad Jardín · 800 m', categoria: 'Hogar', tipo: 'Préstamo', color: '#0F766E'},
];

const CATEGORIAS = ['Todos', 'Herramientas', 'Hogar', 'Camping', 'Libros'];
const TABS = ['Catálogo', 'Publicar', 'Solicitudes', 'Perfil'];

function App(): React.JSX.Element {
  const [busqueda, setBusqueda] = useState('');
  const [categoria, setCategoria] = useState('Todos');

  const filtrados = OBJETOS.filter(
    o =>
      o.nombre.toLowerCase().includes(busqueda.toLowerCase()) &&
      (categoria === 'Todos' || o.categoria === categoria),
  );

  return (
    <View style={styles.pantalla}>
     <StatusBar barStyle="dark-content" />
      <View style={styles.encabezado}>
        <Text style={styles.logo}>
          Share<Text style={styles.logoAcento}>Hood</Text>
        </Text>
        <Text style={styles.saludo}>Hola, vecino</Text>
        <Text style={styles.titulo}>¿Qué necesitas hoy?</Text>

        <TextInput
          style={styles.buscador}
          placeholder="Buscar taladro, carpa, libros…"
          placeholderTextColor="#7A9B97"
          value={busqueda}
          onChangeText={setBusqueda}
        />

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {CATEGORIAS.map(c => (
            <TouchableOpacity
              key={c}
              onPress={() => setCategoria(c)}
              style={[styles.chip, categoria === c && styles.chipActivo]}>
              <Text style={[styles.chipTexto, categoria === c && styles.chipTextoActivo]}>
                {c}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.subtitulo}>Cerca de ti</Text>
      </View>

      <FlatList
        data={filtrados}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={styles.fila}
        contentContainerStyle={styles.lista}
        ListEmptyComponent={
          <Text style={styles.vacio}>No encontramos objetos con esa búsqueda.</Text>
        }
        renderItem={({item}) => (
          <View style={styles.tarjeta}>
            <View style={[styles.imagen, {backgroundColor: item.color}]}>
              <Text style={styles.letra}>{item.nombre.charAt(0)}</Text>
            </View>
            <View style={styles.cuerpo}>
              <Text style={styles.nombre}>{item.nombre}</Text>
              <Text style={styles.lugar}>{item.lugar}</Text>
              <Text
                style={[
                  styles.etiqueta,
                  item.tipo === 'Préstamo' ? styles.prestamo : styles.trueque,
                ]}>
                {item.tipo}
              </Text>
            </View>
          </View>
        )}
      />

      <View style={styles.barraTabs}>
        {TABS.map((t, i) => (
          <View key={t} style={styles.tab}>
            <View style={[styles.icono, i === 0 && styles.iconoActivo]} />
            <Text style={[styles.tabTexto, i === 0 && styles.tabTextoActivo]}>{t}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pantalla: {
    flex: 1,
    backgroundColor: '#F0FDFA',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 50,
  },
  encabezado: {paddingHorizontal: 18, paddingTop: 12},
  logo: {fontSize: 22, fontWeight: '800', color: '#134E4A'},
  logoAcento: {color: '#14B8A6'},
  saludo: {fontSize: 13, color: '#5B7A76', marginTop: 12},
  titulo: {fontSize: 22, fontWeight: '700', color: '#134E4A', marginBottom: 12},
  buscador: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CCE7E3',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    color: '#134E4A',
    marginBottom: 12,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#CCE7E3',
    backgroundColor: '#FFFFFF',
    marginRight: 8,
  },
  chipActivo: {backgroundColor: '#0F766E', borderColor: '#0F766E'},
  chipTexto: {fontSize: 13, color: '#134E4A'},
  chipTextoActivo: {color: '#FFFFFF', fontWeight: '600'},
  subtitulo: {fontSize: 15, fontWeight: '700', color: '#134E4A', marginTop: 16, marginBottom: 10},
  lista: {paddingHorizontal: 18, paddingBottom: 16},
  fila: {justifyContent: 'space-between'},
  tarjeta: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#DCEFEC',
    overflow: 'hidden',
    marginBottom: 12,
  },
  imagen: {height: 90, alignItems: 'center', justifyContent: 'center'},
  letra: {fontSize: 34, fontWeight: '800', color: '#FFFFFF'},
  cuerpo: {padding: 10},
  nombre: {fontSize: 14, fontWeight: '700', color: '#134E4A'},
  lugar: {fontSize: 11.5, color: '#5B7A76', marginTop: 2},
  etiqueta: {
    alignSelf: 'flex-start',
    fontSize: 11,
    fontWeight: '700',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    marginTop: 6,
    overflow: 'hidden',
  },
  prestamo: {backgroundColor: '#CCFBF1', color: '#0F766E'},
  trueque: {backgroundColor: '#FEF3C7', color: '#92400E'},
  vacio: {textAlign: 'center', color: '#5B7A76', marginTop: 30},
  barraTabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#CCE7E3',
    paddingVertical: 10,
  },
  tab: {alignItems: 'center'},
  icono: {width: 22, height: 22, borderRadius: 7, borderWidth: 2, borderColor: '#9DBBB7', marginBottom: 3},
  iconoActivo: {borderColor: '#0F766E', backgroundColor: '#CCFBF1'},
  tabTexto: {fontSize: 11, color: '#7A9B97'},
  tabTextoActivo: {color: '#0F766E', fontWeight: '700'},
});

export default App;
