import { defaultStyles, primaryColor } from '../../defaultStyles.js';
import { ScrollView } from 'react-native-gesture-handler';
import { Button } from 'react-native-elements';
import React, { useState, useEffect } from 'react';
import { styles } from './styles.js';
import { View, Text, StatusBar } from 'react-native';

import ConfigurationApi from '../../../services/ConfigurationApi.js';
import AsyncStorage from '@react-native-community/async-storage'
import SincProgress from '../../../components/SincProgress';
import api from '../../../services/api';

export default function Emitente({ navigation }) {
    const [emitentes, setEmitentes] = useState([]);

    //Loading
    const [progress, setProgress] = useState(false);
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        loadEmitentes();
    }, []);

    loadEmitentes = async () => {
        setProgress(true);
        setTitle('Aguarde');
        setMessage('Carregando Emitentes...');

        api.get('/troppus/getInfo.do').then(resp => {
            const userData = resp.data;
            ConfigurationApi.setUserData(userData);
            if (userData.usuario != null) {
                api.get(`/troppus/emitente/buscarEmitentes.do?codUser=${userData.usuario}`).then(resp => {
                    const emitentes = resp.data;
                    if (emitentes.length && emitentes.length > 1) {
                        setEmitentes(emitentes);
                    } else {
                        AsyncStorage.removeItem('token').then(() => {
                            AsyncStorage.removeItem('emitente').then(() => {
                                navigation.navigate('Login');
                            });
                        });
                    }
                });
            }
        }).finally(() => {
            setTimeout(() => {
                setProgress(false);
            }, 1000);
        });
    }

    handleEmitenteChange = async item => {
        const config = ConfigurationApi.getConfig();
        const { emitente, razaoSocial, ...dados } = { ...item };
        dados.codigo = emitente;
        await AsyncStorage.removeItem('menu');
        await AsyncStorage.removeItem('descricaoMenu');
        api({
            method: 'post',
            url: '/supervisor/ajaxEscolherEmpresaPost.do',
            headers: config.headers,
            data: dados
        }).then(resp => {
            // console.log(resp.data);
            api.get('/troppus/getInfo.do').then(resp => {
                const userData = resp.data;
                ConfigurationApi.setUserData(userData);
                AsyncStorage.setItem('codigoEmitente', emitente.toString());
                AsyncStorage.setItem('emitente', `${emitente} - ${razaoSocial}`);
                AsyncStorage.setItem('emitentFull', JSON.stringify(item));
                navigation.navigate('SincDashboard');
            });
        });
    }

    const renderEmitentes = item => {
        return (
            <Button
                key={item.emitente}
                title={`${item.emitente} - ${item.nome}`}
                titleStyle={styles.titleButton}
                buttonStyle={styles.button}
                onPress={() => handleEmitenteChange(item)}
                type='solid'
            />
        );
    }

    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor={primaryColor} />
            <View style={defaultStyles.containerBody}>
                <View style={defaultStyles.containerFormNotPadding}>
                    <View style={styles.viewEmitente} >
                        <Text style={styles.textEmitente}>Selecione o Emitente</Text>
                    </View>
                    <ScrollView>
                        { emitentes != null && emitentes.map(item => renderEmitentes(item)) }
                    </ScrollView>
                </View>
                <SincProgress visible={progress} title={title} message={message} />
            </View>
        </>
    );
}