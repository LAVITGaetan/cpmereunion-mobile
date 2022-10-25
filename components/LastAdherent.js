import React from "react";
import { View, Text, StyleSheet, Image, Button } from "react-native";
import { useNavigation } from '@react-navigation/native';

const LastAdherent = (props) => {
    const navigation = useNavigation();

    return (
        <View style={{ flex: 1, borderLeftWidth:3, borderLeftColor:"#081d2E", marginBottom:15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: "#ffffff", padding: 20, borderRadius: 3 }}>
          <View>
            <Text style={{ fontSize: 17, color: "#081d2E", fontWeight: '700', marginBottom: 5 }}>{props.data.entreprise}</Text>
            <Text style={{ fontSize: 16, color: "#20BFC1", fontWeight: '600' }}>{props.data.section}</Text>
          </View>
          <View>
            <Button title='Voir' color={"#20BFC1"} onPress={() => {
                navigation.navigate('Profil', {data: props.data})
            }} />
          </View>
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

export default LastAdherent;