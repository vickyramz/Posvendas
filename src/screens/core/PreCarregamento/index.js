import { primaryColor, successColor, errorColor, warningColor, infoColor } from '../../defaultStyles';
import { ImageBackground, Image, AsyncStorage, ActivityIndicator } from 'react-native';
import { useNetInfo } from "@react-native-community/netinfo";
import { isEmpty } from '../../../utils/SincCompare';
import React, { useEffect } from 'react';
import { styles } from './styles.js';

import ConfigurationApi from '../../../services/ConfigurationApi';
import fundo from '../../../assets/BackgroundSINC.png';
import DropdownAlert from 'react-native-dropdownalert';
import logo from '../../../assets/SINC.png';
import api from '../../../services/api';
import UserData from '../../../services/UserData';

export default function PreCarregamento({ navigation }) {

    const netInfo = useNetInfo();

    useEffect(() => {
        setTimeout(async () => {
            AsyncStorage.getItem('token').then(async token => {
                if (token != null) {
                    await autoLoginClient();
                } else {
                    navigation.navigate('Login');
                }
            })
            // navigation.navigate('Login');
            await getLogoSinc();
            
        }, 1500);
    }, []);

    autoLoginClient = async () => {
        if (netInfo.isConnected == true) {
            const loginInterno = await AsyncStorage.getItem('login');
            const senhaInterno = await AsyncStorage.getItem('senha');
            if (loginInterno != null && senhaInterno != null) {
                await ConfigurationApi.setBaseURL();
                api.post('/supervisor/ws/login', {
                    login: loginInterno,
                    senha: senhaInterno
                }).then(resp => {
                    console.log("resp",resp.data)
                    const data = resp.data;
                    if (data.sucesso) {
                        api.get('/troppus/getInfo.do').then(resp => {
                            const userData = resp.data;
                    console.log("resp",resp.data)

                            ConfigurationApi.setUserData(userData);

                            if (userData.usuario != null) {
                                AsyncStorage.setItem('token', data.token)
                                AsyncStorage.getItem('emitente').then(emitente => {
                                    return emitente != null ? navigation.navigate('SincDashboard') : navigation.navigate('Emitente');
                                });
                            }
                            else {
                                navigation.navigate('Login');
                                 AsyncStorage.removeItem('token');
                                 AsyncStorage.removeItem('selectAgendamentos');
                            }
                        });
                    } else {
                        navigation.navigate('Login');
                    }
                }).catch(ex => {
                    if (ex.response.status === 404) {
                        this.notification.alertWithType('warn', 'Notificação', 'WildFly Não Encontrado ou Fora de Serviço!');
                    }
                });
            } else {
                navigation.navigate('Login');
            }
        } else {
            await ConfigurationApi.setBaseURL();
        }
    }

    getLogoSinc = async () => {
        const chaveLogo = await AsyncStorage.getItem('chaveLogo');
        let chave = (chaveLogo != null ? chaveLogo : 'IMG_TELA_LOGIN');
        const serverURL = await AsyncStorage.getItem('serverURL');
        if (!isEmpty(serverURL)) {
            await AsyncStorage.getItem('imagemTelaLogin').catch(async () => {
                await ConfigurationApi.setBaseURL();
                const resp = await api.get(`/troppus/sin/sin135/buscarPorChave.do?chave=${chave}`);
                const data = resp.data;
                if (data.sucesso) {
                    AsyncStorage.setItem('imagemTelaLogin', data.arquivoImagem[0].arquivo);
                } else {
                    AsyncStorage.removeItem('imagemTelaLogin');
                }
            })
        } else {
            this.notification.alertWithType('warn', 'Notificação', 'Falta Parametrizar a URL do Servidor!');
        }
    }

    return (
        <>
            <ImageBackground style={styles.fundoLogin} source={fundo}>
                <Image style={styles.logo} resizeMode={'contain'} source={logo} />
                <ActivityIndicator size="large" color={primaryColor} />
                <DropdownAlert
                    ref={ref => this.notification = ref}
                    inactiveStatusBarBackgroundColor={primaryColor}
                    successColor={successColor}
                    errorColor={errorColor}
                    warnColor={warningColor}
                    infoColor={infoColor}
                />
            </ImageBackground>
        </>
    );
};