import { primaryColor, darkColor, whiteColor, infoColor } from '../../screens/defaultStyles';
import { Button } from 'react-native-elements';
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, SafeAreaView, RefreshControl, StyleSheet } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage'
import api from '../../services/api';
import { ScrollView } from 'react-native-gesture-handler';
import ConfigurationApi from '../../services/ConfigurationApi.js';
import SincProgress from '../../components/SincProgress';
import SincEmitenteTop from '../../components/SincEmitenteTop.js';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function Programas({ navigation }) {
    const [programa, setPrograma] = useState([]);
    const [nomeMenu, setNomeMenu] = useState('');
    const [descricaoMenu, setDescricaoMenu] = useState('');
    const [refreshing, setRefreshing] = useState(false);

    const [progress, setProgress] = useState(false);
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        searchProgramas();
    }, []);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        searchProgramas().then(() => setRefreshing(false));
    }, [refreshing]);

    async function searchProgramas() {
        settingMessageDialog(true, 'Aguarde', 'Carregando Programas...');
        
        setDescricaoMenu(await AsyncStorage.getItem('descricaoMenu'));
        const nomeDoMenu = await AsyncStorage.getItem('menu');

        let userData = ConfigurationApi.getUserData();
        api.get(`/supervisor/menuWeb.do?menu=${encodeURIComponent(nomeDoMenu)}&t=${userData.usuario}`).then(resp => {
            setPrograma(resp.data.items);
        }).catch(ex => {
            this.notification.alertWithType('error', 'Notificação', `Erro ao Montar Menu de Programas - ${ex}`);
        }).finally(() => {
            setProgress(false);
        });
    }

    function settingMessageDialog(progress, title, message) {
        setProgress(progress);
        setTitle(title);
        setMessage(message);
    }

    const handleProgramaChange = item => {
        AsyncStorage.setItem('programa', item.codigo);
        setNomeMenu(item.codigo);
        let nameClass = removeAccentsString(item.descricao);
        nameClass = convertNameToClass(nameClass);
        // console.log(nameClass);
        navigation.navigate(`${nameClass}`);
    }

    function removeAccentsString(str) {
        let com_acento = "ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝŔÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿŕ";
        let sem_acento = "AAAAAAACEEEEIIIIDNOOOOOOUUUUYRsBaaaaaaaceeeeiiiionoooooouuuuybyr";
        let novastr = "";
        for (i = 0; i < str.length; i++) {
            troca = false;
            for (a = 0; a < com_acento.length; a++) {
                if (str.substr(i, 1) == com_acento.substr(a, 1)) {
                    novastr += sem_acento.substr(a, 1);
                    troca = true;
                    break;
                }
            }
            if (troca == false) {
                novastr += str.substr(i, 1);
            }
        }
        return novastr;
    }

    function convertNameToClass(text) {
        var words = text.toLowerCase().split(" ");
        for (var a = 0; a < words.length; a++) {
            var w = words[a];
            words[a] = w[0].toUpperCase() + w.slice(1);
        }
        return words.join("");
    }

    const renderPrograma = item => {
        if (item.programa == true && item.icone != ' ') {
            return (
                <Button
                    key={item.codigo}
                    title={item.descricao}
                    titleStyle={styles.titleIconStyle}
                    buttonStyle={styles.buttonIconStyle}
                    icon={
                        <Icon
                            name={item.icone != ' ' ? item.icone : null}
                            style={styles.iconStyle}
                            size={50}
                            color={whiteColor}
                        />
                    }
                    onPress={() => handleProgramaChange(item)}
                    type='solid'
                />
            );
        } else if (item.programa == true && item.icone === ' ') {
            return (
                <Button
                    key={item.codigo}
                    title={item.descricao}
                    titleStyle={styles.titleStyle}
                    buttonStyle={styles.buttonStyle}
                    icon={
                        <Icon
                            name={item.icone != ' ' ? item.icone : null}
                            size={50}
                            color={whiteColor}
                        />
                    }
                    onPress={() => handleProgramaChange(item)}
                    type='solid'
                />
            );
        }
    }

    const renderTypePrograma = () => {
        let iconLocalizado;
        programa.forEach(item => {
            if (item.icone != ' ' && item.icone != null) {
                iconLocalizado = true;
            } else {
                iconLocalizado = false;
            }
        });

        if (iconLocalizado) {
            return (
                <View style={styles.buttonContainer}>
                    {programa != null && programa.map(item => renderPrograma(item))}
                </View>
            );
        } else {
            return (
                <>
                    {programa != null && programa.map(item => renderPrograma(item))}
                </>
            );
        }
    }

    return (
        <>
            <SafeAreaView style={{ width: '100%', height: '100%', backgroundColor: whiteColor }}>
                <SincEmitenteTop navigation={navigation} />

                <View style={styles.viewPrograma} >
                    <Text style={styles.textPrograma}>{descricaoMenu}</Text>
                </View>

                <View style={styles.containerPrograma}>
                    <View style={[styles.containerProgramaBody, { paddingTop: 20 }]}>
                        <ScrollView
                            refreshControl={
                                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                            }
                        >
                            { renderTypePrograma() }
                        </ScrollView>
                    </View>
                    <SincProgress visible={progress} title={title} message={message} />
                </View>
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    containerPrograma: {
        flex: 1,
        flexDirection: "row",
        alignItems: "flex-start",
        backgroundColor: '#f1f1f1',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },

    containerProgramaBody: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center"
    },

    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },

    viewPrograma: {
        height: 70,
        alignItems: 'center',
        paddingTop: 17,
        backgroundColor: whiteColor,
    },

    textPrograma: {
        fontSize: 30,
        fontWeight: "bold",
        color: darkColor
    },

    titleStyle: {
        color: whiteColor,
        fontWeight: "bold",
        textTransform: 'uppercase'
    },

    titleIconStyle: {
        alignItems: "flex-end",
        color: whiteColor,
        fontSize: 15,
        fontWeight: "bold"
    },    

    buttonStyle: {
        height: 50,
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        backgroundColor: primaryColor,
        borderRadius: 10,
        borderColor: primaryColor,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    buttonIconStyle: {
        width: 182,
        height: 110,
        backgroundColor: primaryColor,
        borderRadius: 20,
        borderColor: primaryColor,
        borderWidth: 1,
        margin: 7,
        alignItems: "center",
        flexDirection: 'column',
        justifyContent: 'center'
    }
});