import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, TextInput, Button, ScrollView, TouchableOpacity } from "react-native";
import { AsyncStorage } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LastAdherent from './LastAdherent';

const Home = () => {
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
  const [adherent1, setAdherent1] = useState([]);
  const [adherent2, setAdherent2] = useState([]);
  const [adherent3, setAdherent3] = useState([]);
  const [adherent4, setAdherent4] = useState([]);
  const [adherent5, setAdherent5] = useState([]);
  const [loading, setLoading] = useState(true)

  const fetchAdherents = async () => {
    const response = await fetch('https://cpmereunion-api.herokuapp.com/api/adherents', {
      headers: {
        'auth-token': token
      }
    })
    const data = await response.json()
    setData(data);
    setAdherent1(data[0]);
    setAdherent2(data[1]);
    setAdherent3(data[2]);
    setAdherent4(data[3]);
    setAdherent5(data[4]);
    setLoading(false)
  }

  useEffect(() => {
    fetchAdherents();
  }, []);

  const artisanat = data.filter(el => el.section === 'artisanat');
  const commerce = data.filter(el => el.section === 'commerce');
  const industrie = data.filter(el => el.section === 'industrie');
  const services = data.filter(el => el.section === 'services');

  return (
    <ScrollView style={{ backgroundColor: "#f1f4f8" }}>
      <Text style={{ marginTop: 40, marginHorizontal: 20, color: '#081d2E', fontWeight: '800', fontSize: 22 }}>Accueil</Text>
      <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', padding: 20, paddingVertical: 15 }}>
        <View style={{ width: '49%', marginRight: '1%', padding: 30, backgroundColor: "#fff", marginBottom: 10, fontSize: 17 }}><TouchableOpacity onPress={() => navigation.navigate('Adherents')}><Text style={{ textAlign: 'center', color: '#081d2E', fontWeight: '600', fontSize: 16 }}>Adhérents</Text></TouchableOpacity></View>
        <View style={{ width: '49%', marginLeft: '1%', padding: 30, backgroundColor: "#fff", marginBottom: 10, fontSize: 17 }}><TouchableOpacity onPress={() => navigation.navigate('Adherents')}><Text style={{ textAlign: 'center', color: '#081d2E', fontWeight: '600', fontSize: 16 }}>Sondages</Text></TouchableOpacity></View>
        <View style={{ width: '49%', marginRight: '1%', padding: 30, backgroundColor: "#fff", marginBottom: 10, fontSize: 17 }}><TouchableOpacity onPress={() => navigation.navigate('Adherents')}><Text style={{ textAlign: 'center', color: '#081d2E', fontWeight: '600', fontSize: 16 }}>Annuaire</Text></TouchableOpacity></View>
        <View style={{ width: '49%', marginLeft: '1%', padding: 30, backgroundColor: "#fff", marginBottom: 10, fontSize: 17 }}><TouchableOpacity onPress={() => navigation.navigate('Adherents')}><Text style={{ textAlign: 'center', color: '#081d2E', fontWeight: '600', fontSize: 16 }}>Mandataires</Text></TouchableOpacity></View>
      </View>
      <Text style={{ paddingHorizontal: 20, color: '#081d2E', fontWeight: '700', fontSize: 20, marginTop: 20, marginBottom: 10 }}>Statistiques</Text>
      <ScrollView horizontal style={{ marginHorizontal: 20 }}>
        <View style={styles.statCard}>
          <View style={styles.statFigure}>
            <Image style={{ width: 20, height: 20 }} source={require('../images/total.png')} />
          </View>
          <Text style={styles.statLabel}>Total</Text>
          <Text style={styles.statLength}>{data.length}</Text>
        </View>
        <View style={styles.statCard}>
          <View style={styles.statFigure}>
            <Image style={{ width: 20, height: 20 }} source={require('../images/artisanat.png')} />
          </View>
          <Text style={styles.statLabel}>Artisanat</Text>
          <Text style={styles.statLength}>{artisanat.length}</Text>
        </View>
        <View style={styles.statCard}>
          <View style={styles.statFigure}>
            <Image style={{ width: 20, height: 20 }} source={require('../images/commerce.png')} />
          </View>
          <Text style={styles.statLabel}>Commerce</Text>
          <Text style={styles.statLength}>{commerce.length}</Text>
        </View>
        <View style={styles.statCard}>
          <View style={styles.statFigure}>
            <Image style={{ width: 20, height: 20 }} source={require('../images/industry.png')} />
          </View>
          <Text style={styles.statLabel}>Industrie</Text>
          <Text style={styles.statLength}>{industrie.length}</Text>
        </View>
        <View style={styles.statCard}>
          <View style={styles.statFigure}>
            <Image style={{ width: 20, height: 20 }} source={require('../images/service.png')} />
          </View>
          <Text style={styles.statLabel}>Services</Text>
          <Text style={styles.statLength}>{services.length}</Text>
        </View>

      </ScrollView>
      <Text style={{ paddingHorizontal: 20, color: '#081d2E', fontWeight: '700', fontSize: 20, marginBottom: 15, marginTop: 30 }}>Derniers adhérents</Text>
      <View style={{ flex: 1, padding: 20 }}>

        <LastAdherent data={adherent1} />
        <LastAdherent data={adherent2} />
        <LastAdherent data={adherent3} />
        <LastAdherent data={adherent4} />
        <LastAdherent data={adherent5} />
      </View>

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  statCard: {
    width: 120, backgroundColor: '#fff', padding: 10, marginRight: 15
  },
  statFigure: {
    width: 40, height: 40, backgroundColor: '#081d2e', flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 10, borderRadius: 50
  },
  statLabel: {
    fontWeight: '600', color: '#20BFC1', fontSize: 16, marginBottom: 5
  },
  statLength: {
    fontWeight: '800', color: '#081d2e', fontSize: 20,
  },
})

export default Home;