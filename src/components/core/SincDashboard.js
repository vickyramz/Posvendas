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
import { menuConstant } from './menuConstant.js';
import logo from '../../assets/settings.png';
 
export default function SincDashboard({ navigation }) {

    //Loading
    const [progress, setProgress] = useState(false);
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [getPlaca, setPlacamsg] = useState('');
    
    useEffect(() => {
        redirectTabs();
        getPalcadata();
    }, []);

    redirectTabs = async () => {
        await AsyncStorage.getItem('modulo').then(modulo => {
            return !isEmpty(modulo) ? navigation.navigate('Programas') : navigation.navigate('Menu');
        });
    }

    getPalcadata = async () => {
        const placadata = JSON.parse(await AsyncStorage.getItem('selectAgendamentos'));            
            if(placadata !== null){
                setPlacamsg(placadata[2] !== null ? placadata[2] : '')
            }
    }

    //Code Added for menu selected on task-1.1 
    menuselected = (id, name) => {
        if(id === 1){
            navigation.navigate('Agendamentos')
        } else if(id === 3){
            navigation.navigate('Checklist')
        } else if(id === 4){
            navigation.navigate('ReduxEx')
        }
    }

    return (
        <>
            <SafeAreaView>
                <SincEmitenteTop navigation={navigation} />
                {/* DESENVOLVER A BORDA SUPERIOR DE STATUS EM AZUL */}

                {/* ADICIONAR O EMITENTE EM UM FILETE BEM PEQUENO */}
                {getPlaca !== '' ?
                    <View style={{alignItems:'center',backgroundColor:'#cacaca',padding:10,borderRadius:10,marginTop:10,marginHorizontal:20}}>
                        <Text>Placa: {getPlaca}</Text>
                    </View> : null
                }
                
                <View style={styles.MainContainer}>
                    
                    <FlatList
                    data={menuConstant}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => menuselected(item.id, item.name)} style={[styles.boxContainer,{backgroundColor: item.bgcolour !== null ? item.bgcolour :'#cacaca' }]} >
                            <View style={{ }} >                            
                                <View style={styles.imageContainer}>
                                    <View style={styles.imageItem}>
                                    <Image style={styles.logo} resizeMode={'contain'} source={logo} />
                                    </View>
                                </View>
                                <View style = {styles.nameLabel}>
                                    <Text style={styles.itemText}>{item.name}</Text>
                                </View>
                            </View> 
                        </TouchableOpacity>
                    )}
                    numColumns={3}
                    keyExtractor={(item, index) => index.toString()}
                    />
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

    boxContainer:{ 
        flex: 1, 
        flexDirection: 'column',
        borderRadius: 10, 
        margin: 1, 
        height:75, 
        width:50, 
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

    imageContainer: { 
        alignItems:'center',
    },
    
    imageItem: {
        paddingVertical:10
    },

    nameLabel: {
        alignItems:'center',
        paddingBottom:10
    },
});