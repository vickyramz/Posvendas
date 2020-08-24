import { primaryColor, successColor, errorColor, warningColor, infoColor, whiteColor, darkColor, selectedPrimaryColor } from '../../screens/defaultStyles';
import { View, Text, SafeAreaView, RefreshControl, StyleSheet } from 'react-native';
import ConfigurationApi from '../../services/ConfigurationApi.js';
import AsyncStorage from '@react-native-community/async-storage';
import React, { useState, useEffect, useCallback } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';
import SincProgress from '../../components/SincProgress';
import DropdownAlert from 'react-native-dropdownalert';
import SincEmitenteTop from '../SincEmitenteTop.js';
import { Button } from 'react-native-elements';
import api from '../../services/api';

export default function SincMenu({ navigation }) {
    const [listaMenu, setListaMenu ] = useState([]);
    const [descricaoMenu, setDescricaoMenu] = useState('');
    const [refreshing, setRefreshing] = useState(false);
    const [mergulho, setMergulho] = useState(0);
    const [menu, setMenu] = useState('');

    const [progress, setProgress] = useState(false);
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        searchMenu('#SISTEMA');
    }, []);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        AsyncStorage.removeItem('descricaoMenu');

        searchMenu('#SISTEMA').then(() => setRefreshing(false));
    }, [refreshing]);

    async function searchMenu(chaveMenu) {
        settingMessageDialog(true, 'Aguarde', 'Carregando Menu...');
        setDescricaoMenu(await AsyncStorage.getItem('descricaoMenu'));
        setMenu(chaveMenu);
        
        let userData = ConfigurationApi.getUserData();
        api.get(`/supervisor/menuWeb.do?menu=${encodeURIComponent(chaveMenu)}&t=${userData.usuario}`).then(async resp => {
            if (resp.data.items.length > 0 && resp.data.items[0].programa != true) {
                setMenu(chaveMenu);
                setMergulho(mergulho + 1);
                setListaMenu(resp.data.items);
            } else if (chaveMenu != '#SISTEMA' && resp.data.items[0].programa == true) {
                if (mergulho == 1) {
                    setMenu('#SISTEMA');
                    // setMergulho(0);
                }
                return navigation.navigate('SincProgramas');
            }
        }).catch(ex => {
            this.notification.alertWithType('error', 'Notificação', `Erro ao Montar Menu de Módulos - ${ex}`);
        }).finally(() => {
            setProgress(false);
        });
    }

    function settingMessageDialog(progress, title, message) {
        setProgress(progress);
        setTitle(title);
        setMessage(message);
    }

    async function handleMenuChange(item) {
        AsyncStorage.setItem('menu', item.codigo);
        AsyncStorage.setItem('descricaoMenu', item.descricao);
        setDescricaoMenu(item.descricao);
        searchMenu(item.codigo);
    }

    async function voltarMenuAnterior() {
        AsyncStorage.setItem('menu', '#SISTEMA');
        AsyncStorage.removeItem('descricaoMenu');
        setMenu('#SISTEMA');
        setMergulho(0);
        await searchMenu('#SISTEMA');
    }

    const renderMenu = item => {
        return ((item.icone != null && item.icone !== ' ' || (item.codigo == '#ESPECIF' && item.icone == ' ')) &&
            <Button
                key={item.codigo}
                title={item.descricao}
                titleStyle={item.icone != null && item.icone != ' ' ? styles.titleIconStyle : styles.titleStyle}
                buttonStyle={item.icone != null && item.icone != ' ' ? styles.buttonIconStyle : styles.buttonStyle}
                icon={
                    <Icon
                        name={item.icone != null && item.icone != ' ' ? item.icone : null }
                        style={styles.iconStyle}
                        size={50}
                        color={whiteColor}
                    />
                }
                onPress={() => handleMenuChange(item)}
                type='solid'
            />
        );
    }

    return (
        <>
            <SafeAreaView style={{ width: '100%', height: '100%', backgroundColor: whiteColor }}>
                <SincEmitenteTop navigation={navigation} />
                
                <View style={styles.viewMenu} >
                    <Text style={styles.textMenu}>{descricaoMenu != '' && descricaoMenu != null ? descricaoMenu : 'Módulos'}</Text>
                </View>

                <View style={styles.containerMenu}>
                    <View style={[styles.containerMenuBody, { paddingTop: 20 }]}>
                        <ScrollView
                            refreshControl={
                                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                            }
                        >
                            <View style={styles.buttonContainer}>
                                {listaMenu != null && listaMenu.map(item => renderMenu(item))}
                                {descricaoMenu != '' && descricaoMenu != null && menu != '#SISTEMA' &&
                                <Button
                                    key='Voltar'
                                    title='Voltar'
                                    titleStyle={styles.titleIconStyle}
                                    buttonStyle={styles.buttonIconStyle}
                                    icon={
                                        <Icon
                                            name='arrow-left'
                                            style={styles.iconStyle}
                                            size={50}
                                            color={whiteColor}
                                        />
                                    }
                                    onPress={() => voltarMenuAnterior()}
                                    type='solid'
                                />}
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </SafeAreaView>

            <SincProgress visible={progress} title={title} message={message} />

            <DropdownAlert
                ref={ref => this.notification = ref}
                successColor={successColor}
                errorColor={errorColor}
                warnColor={warningColor}
                infoColor={infoColor}
            />
        </>
    );
}

const styles = StyleSheet.create({
    containerMenu: {
        flex: 1,
        flexDirection: "row",
        alignItems: "flex-start",
        backgroundColor: '#f1f1f1',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },

    containerMenuBody: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center"
    },

    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },

    viewMenu: {
        height: 70,
        alignItems: 'center',
        paddingTop: 17,
        backgroundColor: whiteColor,
    },

    textMenu: {
        fontSize: 30,
        fontWeight: "bold",
        color: darkColor
    },

    titleStyle: {
        marginTop: 35,
        alignItems: "flex-end",
        color: whiteColor,
        fontSize: 15,
        fontWeight: "bold"
    },

    titleIconStyle: {
        alignItems: "flex-end",
        color: whiteColor,
        fontSize: 15,
        fontWeight: "bold"
    },

    buttonStyle: {
        width: 182,
        height: 110,
        marginLeft: 7,
        backgroundColor: primaryColor,
        borderRadius: 20,
        borderColor: primaryColor,
        borderWidth: 1,
        margin: 10,
        marginTop: 7,
        marginBottom: 7,
        marginRight: 7,
        alignItems: "stretch",
    },

    buttonIconStyle: {
        width: 182,
        height: 110,
        marginLeft: 7,
        backgroundColor: primaryColor,
        borderRadius: 20,
        borderColor: primaryColor,
        borderWidth: 1,
        margin: 10,
        marginTop: 7,
        marginBottom: 7,
        marginRight: 7,
        alignItems: "center",
        flexDirection: 'column',
        justifyContent: 'center'
    },

    iconStyle: {

    }
});