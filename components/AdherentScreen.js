import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TextInput } from "react-native";
import { AsyncStorage } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CardAdherent from './CardAdherent';

const AdherentScreen = () => {
  const navigation = useNavigation();

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
    const response = await fetch('https://cpmereunion-api.herokuapp.com/api/adherents', {
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

  renderHeader = () => {
    return (
      <SearchBar
        placeholder="Type Here..."
        lightTheme
        round
        onChangeText={text => this.searchFilterFunction(text)}
        autoCorrect={false}
      />
    );
  };

  const Loading = () => {
    if (loading) {
      return (
        <ActivityIndicator style={{ marginTop: 50 }} size="large" color="#20BFC1"></ActivityIndicator>
      )
    }
    return (
      <View>
        <TextInput onChange={(text) => {searchFilter(text)}} placeholder='Rechercher un adhérent' style={{ fontSize: 16, height: 50, borderWidth: 2, paddingLeft: 20, margin: 20, borderColor: "#20BFC110", backgroundColor: "#ffffff", borderBottomColor: "#20BFC1", borderBottomWidth: 3 }}></TextInput>
        <Text style={{ padding: 20, fontSize: 17, color: "#081d2E" }}>{data.length} résultats trouvés</Text>
      </View>
    )
  }

  const searchFilter = (text) => {
    console.log(text);
  }

  return (
    <View>
      <Loading />
      <FlatList
        data={data}
        keyExtractor={item => item._id}
        renderItem={({ item }) => {
          return (
            <CardAdherent activite={item.activite} adresse={item.adresse} siteweb={item.siteweb} nom={item.nom} prenom={item.prenom} entreprise={item.entreprise} section={item.section} email={item.email} identifiant={item.identifiant} logo={item.logo} id={item._id} token={token} />
          )
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30
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

export default AdherentScreen;