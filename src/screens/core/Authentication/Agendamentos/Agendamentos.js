import { primaryColor, successColor, errorColor, warningColor, infoColor, whiteColor, darkColor, selectedPrimaryColor } from '../../screens/defaultStyles';
import { Button, Input } from 'react-native-elements';
import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, StyleSheet, FlatList, ActivityIndicator, Image, TouchableOpacity, } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import api from '../../services/api';
import { ScrollView } from 'react-native-gesture-handler';
import ConfigurationApi from '../../services/ConfigurationApi.js';
import SincEmitenteTop from '../../components/SincEmitenteTop.js';
import { isEmpty } from '../../utils/SincCompare.js';
import logo from '../../assets/Normal.png';
 
export default function Agendamentos({ navigation }) {

    //Loading
    const [progress, setProgress] = useState(false);
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        redirectTabs();
    }, []);

    redirectTabs = async () => {
        await AsyncStorage.getItem('modulo').then(modulo => {
            return !isEmpty(modulo) ? navigation.navigate('Programas') : navigation.navigate('Menu');
        });
    }

    menuselected = (id) => {
        console.log("menu selected",id)
    }

    return (
        <>
            <SafeAreaView>
                <SincEmitenteTop navigation={navigation} />
                {/* DESENVOLVER A BORDA SUPERIOR DE STATUS EM AZUL */}

                {/* ADICIONAR O EMITENTE EM UM FILETE BEM PEQUENO */}
                {/* <View style={styles.MainContainer}>
                    <Image style={styles.logo} resizeMode={'contain'} source={logo} />
                    <Text style={styles.descriptionSystem}>Pós Vendas</Text>
                </View> */}
                <View style={styles.MainContainer}>
                <Text style={styles.itemText}>AGES</Text>
                    {/* <FlatList
                    data={menuConstant}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => menuselected(item.id)} style={{ flex: 1, flexDirection: 'column', borderRadius: 10, margin: 1, height:75, width:50, backgroundColor: item.bgcolour !== null ? item.bgcolour :'#cacaca' }} >
                            <View style={{ }} >                            
                                <View style={{ flex:1,alignItems:'center'}}>
                                    <View style={{paddingVertical:10}}>
                                    <Image style={styles.logo} resizeMode={'contain'} source={logo} />
                                    </View>
                                </View>
                                <View style = {{alignItems:'center',paddingBottom:10}}>
                                    <Text style={styles.itemText}>{item.name}</Text>
                                </View>
                            </View> 
                        </TouchableOpacity>
                    )}
                    numColumns={3}
                    keyExtractor={(item, index) => index.toString()}
                    /> */}
                </View>

                {/* DESENVOLVER O LAYOUT DE MENU INFERIOR */}
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    logo: {
        // marginBottom: 20, 
        width: 40, 
        height: 40
    },

    containerLogo: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: whiteColor
    },

    descriptionSystem: {
        fontSize: 18,
        color: primaryColor,
        fontWeight: 'bold',
        fontStyle: 'italic'
    },

    MainContainer: {
        justifyContent: 'center',
        // flex: 1,
        margin: 30,
    },
    imageThumbnail: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 100,
    },
    itemText: {
        color: '#fff',
        fontSize: 12,
        // fontWeight: 'bold',
    },
});