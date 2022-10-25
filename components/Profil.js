import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native";
import { AsyncStorage } from 'react-native';
import { useRoute, useNavigation, useLinkProps } from '@react-navigation/native';

const AdherentScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    return (
        <ScrollView>
            <View style={{ height: 250, backgroundColor: "#081d2E" }}>
                <View style={{ width: 150, height: 150, borderRadius: 0, borderWidth: 3, borderColor: '#20BFC1', marginTop: 50, alignSelf: 'center' }}><Image style={{ width: 144, height: 144, aspectRatio:1 }} source={{ uri: `https://www.forumhorizonsmaroc.com/wp-content/uploads/2020/01/20-3-300x210.png` }} /></View>
            </View>
            <Text style={{ fontSize: 22, color: "#081d2e", textAlign: "center", fontWeight: '800', marginTop: 30, marginBottom: 5 }}>{route.params.data.entreprise}</Text>
            <Text style={{ fontSize: 20, color: "#20BFC1", textAlign: "center", fontWeight: '700', marginBottom: 20 }}>{route.params.data.section}</Text>
            <View style={{ marginHorizontal: 20, marginVertical: 5, }}>
                <Text style={{ fontSize: 17, color: "#081d2e", fontWeight: '600' }}>Représentant</Text>
                <Text style={{ fontSize: 15, color: "#081d2e" }}>{route.params.data.nom} {route.params.data.prenom}</Text>
            </View>
            <View style={{ marginHorizontal: 20, marginVertical: 5 }}>
                <Text style={{ fontSize: 17, color: "#081d2e", fontWeight: '600' }}>Activité</Text>
                <Text style={{ fontSize: 15, color: "#081d2e" }}>{route.params.data.activite}</Text>
            </View>
            <View style={{ marginHorizontal: 20, marginVertical: 5 }}>
                <Text style={{ fontSize: 17, color: "#081d2e", fontWeight: '600' }}>Adresse</Text>
                <Text style={{ fontSize: 15, color: "#081d2e" }}>{route.params.data.adresse}</Text>
            </View>
            <View style={{ marginHorizontal: 20, marginVertical: 10, paddingHorizontal: 20, paddingVertical: 10, backgroundColor: '#ffffff' }}>
                <Text style={{ fontSize: 17, color: "#081d2e", fontWeight: '700' }}>{route.params.data.email}</Text>
                <Text style={{ fontSize: 17, color: "#081d2e", fontWeight: '700', marginBottom: 15 }}>{route.params.data.identifiant}</Text>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('Identifiant', { adherent: route.params.data, email: route.params.data.email, identifiant: route.params.data.identifiant, id: route.params.data._id })
                    console.log(('running'));
                }
                }
                    style={{ backgroundColor: "#20BFC1", padding: 10 }}><Text style={{ textAlign: "center", fontSize: 17, color: "#ffffff", fontWeight: '700' }}>Modifier les identifiants</Text></TouchableOpacity>
            </View>
        </ScrollView>
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