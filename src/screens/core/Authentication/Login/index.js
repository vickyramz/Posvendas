import React, { useState, useEffect } from 'react';
import { View, KeyboardAvoidingView, Platform, Image, Text, StatusBar } from 'react-native';
import { defaultStyles, primaryColor, darkColor, whiteColor, successColor, errorColor, warningColor, infoColor } from '../../../defaultStyles';
import { useNetInfo } from "@react-native-community/netinfo";
import { Button, Input } from 'react-native-elements';
import { styles } from './styles.js';
import { isEmpty } from '../../../../utils/SincCompare';

import AsyncStorage from '@react-native-community/async-storage';
import SincProgress from '../../../../components/SincProgress.js';
import Icon from 'react-native-vector-icons/FontAwesome5';
import DropdownAlert from 'react-native-dropdownalert';
import logo from '../../../../assets/SINC.png';
import api from '../../../../services/api';

export default function Login({ navigation }) {
    const [login, setLogin] = useState('MASTER');
    const [senha, setSenha] = useState('MSTR');
    const [logoView, setLogoView] = useState('');

    //Loading
    const [progress, setProgress] = useState(false);
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');

    const netInfo = useNetInfo();

    useEffect(() => {
        function loadLogo() {
            return sourceLogo().then(newlogoView => {
                setLogoView(newlogoView);
            }).catch(() => {
                setLogoView(logo);
            });
        }
        
        loadLogo();
    }, [logoView]);

    async function handleSubmit() {
        console.log("response handle");
        if (netInfo.isConnected == true) {
            
            setProgress(true);
            setTitle('Aguarde');
            setMessage('Efetuando o Login...');

            const response = await api.post('/supervisor/ws/login', {
                login,
                senha
            }).catch(ex => {
                setProgress(false);
                this.notification.alertWithType('error', 'Notificação Erro', `Erro ao Redirecionar as Rotas. - ${ex}`);

            });
            console.log("response",response.data);
            if (response.data.sucesso) {
                AsyncStorage.setItem('login', login);
                AsyncStorage.setItem('senha', senha);
                AsyncStorage.setItem('token', response.data.token);
                AsyncStorage.getItem('emitente').then(emitente => {
                    return emitente != null ? navigation.navigate('SincDashboard') : navigation.navigate('Emitente');
                });
                // AsyncStorage.getItem('emitente').then(emitente => {
                //     return !isEmpty(emitente) ? navigation.navigate('Dashboard') : navigation.navigate('Emitente');
                // }).catch(ex => {
                //     this.notification.alertWithType('error', 'Notificação Erro', `Erro ao Redirecionar as Rotas. - ${ex}`);
                // }).finally(() => {
                //     setProgress(false);
                // });
            } else {
                setProgress(false);
                this.notification.alertWithType('error', 'Erro ao Logar', 'Informações Incorretas');
            }
        } else {
            console.log("exception ellse");
            this.notification.alertWithType('error', 'Conexão Necessária', 'É Necessário estar Conectado em Uma Rede Para Prosseguir!');
        }
    }

    function handleConfiguration() {
        return navigation.navigate('Configuracao');
    }

    async function sourceLogo() {
        return new Promise((resolve, rejects) =>{
            AsyncStorage.getItem('imagemTelaLogin').then(logoPersonalizado => {
                if(logoPersonalizado != null){
                    const newLogo = { uri: `data:image/*;base64,${logoPersonalizado}` };
                    return resolve(newLogo);
                }else {
                    return rejects();
                }
            });
        });
    }

    return (
        <>
            <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
            <KeyboardAvoidingView enabled={Platform.OS === 'IOS'} behavior="padding" style={defaultStyles.conteiner}>
                <View style={styles.containerLogo}>
                    <Image style={styles.logo} resizeMode={'contain'} source={logoView} />
                    <Text style={styles.descriptionSystem}>Pós Vendas</Text>
                </View>

                <View style={defaultStyles.containerBody}>
                    <View style={defaultStyles.containerForm}>
                        <Input 
                            style={defaultStyles.input}
                            placeholder='Usuário'
                            placeholderTextColor={darkColor}
                            autoCapitalize="characters"
                            autoCorrect={false}
                            leftIcon={
                                <Icon
                                    name='user-alt'
                                    size={24}
                                    color={primaryColor}
                                />
                            }
                            leftIconContainerStyle={{ marginRight: 25 }}
                            value={login}
                            onChangeText={setLogin}
                        />

                        <Input
                            style={defaultStyles.input}
                            placeholder='Senha'
                            placeholderTextColor={darkColor}
                            autoCapitalize="none"
                            secureTextEntry={true}
                            autoCorrect={false}
                            leftIcon={
                                <Icon
                                    name='key'
                                    size={24}
                                    color={primaryColor}
                                />
                            }
                            leftIconContainerStyle={{ marginRight: 25 }}
                            value={senha}
                            onChangeText={setSenha}
                        />

                        <View style={ styles.buttonGroup }>
                            <Button titleStyle={ styles.titleButton } 
                                buttonStyle={ styles.button } 
                                title='Configurar'
                                icon={
                                    <Icon 
                                        name="cogs" 
                                        style={{ marginRight: 5 }} 
                                        size={18}
                                        color={whiteColor} 
                                    />
                                }
                                onPress={() => handleConfiguration()}
                                type='outline' 
                            />

                            <Button titleStyle={ styles.titleButton }
                                buttonStyle={[styles.button, {marginLeft: 22}]}
                                title='Entrar'
                                icon={
                                    <Icon
                                        name="arrow-right"
                                        style={{ marginRight: 5 }}
                                        size={18}
                                        color={whiteColor}
                                    />
                                }
                                onPress={() => handleSubmit()}
                                type='solid'
                            />
                        </View>
                    </View>
                </View>

                <DropdownAlert
                    ref={ref => this.notification = ref}
                    inactiveStatusBarBackgroundColor={primaryColor}
                    successColor={successColor}
                    errorColor={errorColor}
                    warnColor={warningColor}
                    infoColor={infoColor}
                />

                <SincProgress visible={progress} title={title} message={message} />
            </KeyboardAvoidingView>
        </>
    );
}