import {
    defaultStyles, primaryColor, successColor, errorColor,
    warningColor, infoColor, whiteColor, darkColor, selectedPrimaryColor
} from '../../../../defaultStyles';
import { Button, Input } from 'react-native-elements';
import React, { useState, useEffect, Component } from 'react';
import {
    View, KeyboardAvoidingView, Slider, Platform, Text, Modal,
    StatusBar, Dimensions, SafeAreaView, Picker, StyleSheet, FlatList, ActivityIndicator,
    Image, TouchableHighlight, TouchableOpacity, TextInput, BackHandler, ImageBackground
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNetInfo } from "@react-native-community/netinfo";
import { styles } from '../../Agendamentos/styles';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const tireDetailDE = [
    { id: "DE_option1", option: "Bom", },
    { id: "DE_option2", option: "Regular", },
    { id: "DE_option3", option: "Ruim", },

]

const tireDetailDD = [
    { id: "DD_option1", option: "Bom", },
    { id: "DD_option2", option: "Regular", },
    { id: "DD_option3", option: "Ruim", },

]

const tireDetailTE = [
    { id: "TE_option1", option: "Bom", },
    { id: "TE_option2", option: "Regular", },
    { id: "TE_option3", option: "Ruim", },

]

const tireDetailTD = [
    { id: "TD_option1", option: "Bom", },
    { id: "TD_option2", option: "Regular", },
    { id: "TD_option3", option: "Ruim", },

]

const Step6 = () => {
    const [getPlaca, setPlacamsg] = useState('');
    useEffect(() => {

        getPalcadata();
    }, []);
    const getPalcadata = async () => {
        const placadata = JSON.parse(await AsyncStorage.getItem('selectAgendamentos'));
        if (placadata !== null) {
            setPlacamsg(placadata[2] !== null ? placadata[2] : '')
        }
    }
    const tireRender = ({ item, index }) => {
        return (
            <TouchableOpacity style={Styles.ButtonRender}>
                <Text style={{ color: "#000",alignSelf:"center",padding:5}}>{item.option}</Text>
            </TouchableOpacity >
        )
    }

    return (
        <View style={Styles.mainContainer}>
            <ScrollView showsVerticalScrollIndicator={false} >
                {getPlaca !== '' ?
                    <View style={{ alignItems: 'center', backgroundColor: '#cacaca', padding: 10, borderRadius: 10, marginTop: 10, marginHorizontal: 20 }}>
                        <Text>Placa: {getPlaca}</Text>
                    </View> : null
                }

                <View style={{ flexDirection: 'row', alignSelf: 'flex-start' }}>
                    <FlatList style={{ alignSelf: 'flex-start', alignSelf: "center", marginTop: 5 }}
                        initialNumToRender={3}
                        data={tireDetailDE}
                        renderItem={tireRender}></FlatList>
                    <View style={Styles.Defects}>
                        <Text style={{ fontSize: 16, color: '#000', alignSelf: 'center', }}>DD</Text>
                      
                    </View>
                    <FlatList style={{ alignSelf: 'flex-start', alignSelf: "center", marginTop: 5 }}
                        data={tireDetailDE}
                        initialNumToRender={3}
                        showsHorizontalScrollIndicator={false}
                        renderItem={tireRender}></FlatList>
                    <View style={Styles.Defects}>
                        <Text style={{ fontSize: 16, color: '#000', alignSelf: 'center' }}>TE</Text>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', alignSelf: 'flex-start', alignItems: "center" }}>
                    <FlatList style={{ alignSelf: 'flex-start', alignSelf: "center", marginTop: 5 }}
                        initialNumToRender={3}
                        data={tireDetailTE}
                        renderItem={tireRender}></FlatList>
                    <View style={Styles.Defects}>
                        <Text style={{ fontSize: 16, color: '#000', alignSelf: 'center' }}>DE</Text>
                    </View>
                    <FlatList style={{ alignSelf: 'flex-start', alignSelf: "center", marginTop: 5 }}
                        data={tireDetailTD}
                        initialNumToRender={3}
                        showsHorizontalScrollIndicator={false}
                        renderItem={tireRender}></FlatList>
                    <View style={Styles.Defects}>
                        <Text style={{ fontSize: 16, color: '#000', alignSelf: 'center' }}>TD</Text>
                    </View>
                </View>

            </ScrollView>
        </View>
    )
}


const Styles = StyleSheet.create({
    mainContainer: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        height: windowHeight - 100
    },
    Defects: {
        marginTop: 20,
        borderRadius: 25,
        width: 60,
        height: 150,
        justifyContent: 'center',
        backgroundColor: '#808080'
    },
    DefectList: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 3,
        marginLeft: 10
    },
    DefectKeyRender: {
        width: 22,
        height: 30,
        backgroundColor: '#fff',
        borderRadius: 3,
        borderColor: '#000',
        marginLeft: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    BackgroundImageContainer: {
        flex: 1
    },
    image: {
        width: 350,
        height: 300,
        resizeMode: 'contain',
    },
    buttonStyle: {
        alignItems: 'center', justifyContent: 'center'
    },
    ButtonRender: {
        width: 80,
        height: 35,
        borderColor: "#000",
        borderWidth: 1,
        backgroundColor: "#FFF",
        borderRadius: 5,
        marginTop: 5,
        alignSelf: "center",
        marginEnd: 10,
        marginStart: 10,

    }
});
export default Step6;
