import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, TextInput, Button, ScrollView, TouchableOpacity } from "react-native";
import { AsyncStorage } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

const IdentifiantScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [token, setToken] = useState('')
  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      if (value !== null) {
        setToken(value)
      }
    } catch (error) {
      console.log(('erreur'));
    }
  }
  retrieveData()
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true)

  const fetchAdherents = async () => {
    const response = await fetch('https://cpmereunion-api.herokuapp.com/api/adherents/', {
      headers: {
        'auth-token': token
      }
    })
    const data = await response.json()
    setData(data);
    setLoading(false)
  }

  useEffect(() => {
    fetchAdherents();
  }, []);
  const [email, OnChangeEmail] = useState(route.params.email)
  const [identifiant, OnChangeIdentifiant] = useState(route.params.identifiant)

  const generatePassword = () => {
    let result = ''
    var characters = 'ABCDEFGHIJKLMNPQRSTUVWXYZ0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < 5; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    OnChangeIdentifiant(result)
  }

  const patchRequest = async () => {
    setLoading(true)
    const response = await fetch(`https://cpmereunion-api.herokuapp.com/api/adherents/${route.params.id}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
        'withCredentials': 'true',
        'Access-Control-Allow-Origin': 'true',
        'Access-Control-Allow-Credentials': 'true'
      },
      body: JSON.stringify({
        entreprise: route.params.adherent.entreprise,
        section: route.params.adherent.section,
        adresse: route.params.adherent.adresse,
        activite: route.params.adherent.activite,
        nom: route.params.adherent.nom,
        prenom: route.params.adherent.prenom,
        email: email,
        identifiant: identifiant,
        siteweb: route.params.adherent.siteweb,
        logo: route.params.adherent.logo,
        parution: true,
        status: true,
      })
    })

    const data = await response.json()
    if (data.updatedAdherent) {
      OnChangeEmail(data.updatedAdherent.email);
      OnChangeIdentifiant(data.updatedAdherent.identifiant);
      alert('Identifiants modifiés');
      navigation.navigate("Home");
    }
    else {
      alert('Impossible de modifier les identifiants')
      console.log(data.message);
    }
  }

  return (
    <View style={{ padding: 20, flex: 1, }}>
      <Text style={{ marginVertical: 15, fontSize: 18, fontWeight: '600', color: "#081d2E" }}>Email de connexion</Text>
      <TextInput onChangeText={OnChangeEmail} value={email} style={{ borderRadius: 5, backgroundColor: "#ffffff", padding: 10, marginBottom: 15 }} />
      <Text style={{ marginVertical: 15, fontSize: 18, fontWeight: '600', color: "#081d2E" }}>Mot de passe</Text>
      <TextInput onChangeText={OnChangeIdentifiant} maxLength={5} value={identifiant} style={{ borderRadius: 5, backgroundColor: "#ffffff", padding: 10 }} />
      <TouchableOpacity onPress={() => generatePassword()} style={{ marginBottom: 50, marginTop: 10 }}><Text>Aléatoire</Text></TouchableOpacity>
      <Button onPress={() => patchRequest()} title='Modifier les identifiants' color={"#20BFC1"} />
    </View>
  )
}

const styles = StyleSheet.create({
  statCard: {
    width: 120, backgroundColor: '#fff', padding: 10, marginRight: 15
  },
  statFigure: {
    width: 40, height: 40, backgroundColor: '#081d2e', flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 10, borderRadius: 5
  },
  statLabel: {
    fontWeight: '600', color: '#20BFC1', fontSize: 15
  },
  statLength: {
    fontWeight: '800', color: '#081d2e', fontSize: 17,
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center'
  },
})

export default IdentifiantScreen;