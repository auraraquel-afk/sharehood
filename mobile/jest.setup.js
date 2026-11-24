/* eslint-env jest */
// AsyncStorage es un módulo nativo: en las pruebas se usa su versión simulada
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);