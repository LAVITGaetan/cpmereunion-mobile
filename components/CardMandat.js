import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';

const CardMandataire = (props) => {
    const navigation = useNavigation();

    const deleteMandataire = async () => {
        console.log('running');
        const response = await fetch(`https://cpmereunion-api.herokuapp.com/api/mandataires/${props.id}`, {
            method: 'DELETE',
            headers: {
                'auth-token': props.token
            }
        })
        const data = await response.json()
        console.log(data);
        alert(data.message)
        navigation.navigate("Home")
    }
    return (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <TouchableOpacity onPress={() => deleteMandataire()}>
                    <View style={styles.cardHeaderAction}>
                        <Image style={styles.cardHeaderIcon} source={require('../images/edit.png')} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cardHeaderAction}  onPress={() => deleteMandat()}>
                    <Image style={styles.cardHeaderIcon} source={require('../images/delete.png')} />
                </TouchableOpacity>
            </View>
            <View style={styles.cardFigure}>
                <Image source={{ uri: `https://cpmereunion-dashboard.herokuapp.com/${props.logo}` }} style={styles.cardImage} />
            </View>
            <Text style={styles.cardTitle}>{props.prenom} {props.nom}</Text>
            <Text style={styles.cardSubtitle}>Nombre de mandats</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderBottomWidth: 2,
        borderBottomColor: '#f1f4f5',
        margin: 16,
    },
    cardHeader: {
        backgroundColor: '#081d2e',
        height: 64,
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: 16
    },
    cardHeaderAction: {
        backgroundColor: '#20BFC1',
        height: 32,
        width: 32,
        borderRadius: 32,
    },
    cardHeaderIcon: {
        height: 16,
        width: 16,
        margin: 8,
    },
    cardFigure: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: -32
    },
    cardImage: {
        width: 64,
        height: 64,
        borderWidth: 2,
        borderColor: '#20BFC1',
        borderRadius: 64,
    },
    cardTitle: {
        fontSize: 17,
        color: '#081d2e',
        fontWeight: '700',
        textAlign: "center",
        paddingHorizontal: 32,
        paddingVertical: 16,
    },
    cardSubtitle: {
        fontSize: 15,
        color: '#20BFC1',
        fontWeight: '600',
        textAlign: "center",
        paddingHorizontal: 32,
        paddingBottom: 16,
    }
})

export default CardAandataire;