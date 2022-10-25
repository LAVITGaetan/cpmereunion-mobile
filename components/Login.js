import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, TextInput, Button, ActivityIndicator } from "react-native";
import { AsyncStorage } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
    const navigation = useNavigation();

    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const fetchLogin = async () => {
      setLoading(true)
      const response = await fetch('https://cpmereunion-api.herokuapp.com/api/users/login', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          'withCredentials': 'true',
          'Access-Control-Allow-Origin': 'true',
          'Access-Control-Allow-Credentials': 'true'
        },
        body: JSON.stringify({
          // email: email,
          // identifiant: password
          email: 'lavit@test.repp',
          identifiant: 'somesecuredpassword'
        })
      })
  
      const data = await response.json()
      console.log(data.token);
      if (data.token) {
        await AsyncStorage.setItem('token', data.token);
        navigation.navigate('Home')
      }
      else {
        alert('Connexion impossible, veuillez vérifier vos informations')
        setLoading(false)
      }
    }
    return (
        <View style={{ flex: 1, padding: 30 }}>
        <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ backgroundColor: "#20BFC110", width: 96, height: 96, }}>
            <Image style={{ width: 48, height: 48, margin: 24 }} source={require('../images/login.png')} />
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 20, fontWeight: "600", textAlign: 'center' }}>Formulaire de connexion</Text>
        </View>
        <View style={{ flex: 1 }}>
          <TextInput placeholder='Adresse e-mail' style={{ padding: 10, backgroundColor: "#fff" }} />
        </View>
        <View style={{ flex: 1 }}>
          <TextInput secureTextEntry={true} placeholder='Mot de passe' style={{ padding: 10, backgroundColor: "#fff" }} />
        </View>
        <View style={{ flex: 2 }}>
          <Text>{email}</Text>
          <Text>{password}</Text>
          <ActivityIndicator size="large" animating={loading} />

          <Button color="#20BFC1" title='Me connecter' onPress={() => {
            fetchLogin()
          }} />
        </View>
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 30,
        backgroundColor:"#000"
    },

    figureContainer: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 20,
        fontWeight: "600",
        textAlign: 'center'
    },
    input: {
        borderWidth: 2,
        borderColor: '#f1f4f5',
        padding: 10,
        backgroundColor: "#fff"
    },
    image: {
        width: 48,
        height: 48,
        margin: 24
    },
    figure: {
        backgroundColor: "#20BFC110",
        width: 96,
        height: 96
    }
})

export default Login;