import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './components/Login';
import Home from './components/HomeScreen';
import Profil from './components/Profil';
import AdherentScreen from './components/AdherentScreen';
import IdentifiantScreen from './components/IdentifiantScreen';
const Stack = createNativeStackNavigator();

function SondagesScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Page des sondages</Text>
    </View>
  );
}

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}  />
        <Stack.Screen name="Profil" component={Profil} />
        <Stack.Screen name="Identifiant" component={IdentifiantScreen} options={{ title: 'Identifiants' }} />
        <Stack.Screen name="Adherents" component={AdherentScreen} options={{ title: 'Liste des adhérents' }} />
        <Stack.Screen name="Sondages" component={SondagesScreen} options={{ title: 'Liste des sondages' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
