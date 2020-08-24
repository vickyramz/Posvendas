import { primaryColor, darkColor, whiteColor, defaultStyles, successColor, errorColor, warningColor, infoColor } from '../../../defaultStyles.js';
import { Button, Input } from 'react-native-elements';
import React, { useState, useEffect } from 'react';
import { styles } from './styles.js';
import { View } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import SincProgress from '../../../../components/SincProgress.js';
import ConfigurationApi from '../../../../services/ConfigurationApi';
import IconFive from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/FontAwesome';
import DropdownAlert from 'react-native-dropdownalert';

export default function Configuracao({ navigation }) {
    const [serverURL, setServerURL] = useState('');
    const [chaveLogo, setChaveLogo] = useState('');

    //Loading
    const [progress, setProgress] = useState(false);
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        async function loadDate() {
            setProgress(true);
            setTitle('Aguarde');
            setMessage('Carregando Informações...');

            const url = await AsyncStorage.getItem('serverURL');
            setServerURL(url);
            const logo = await AsyncStorage.getItem('chaveLogo');
            setChaveLogo(logo);

            setTimeout(() => {
                setProgress(false);
            }, 500);
        };

        loadDate();
    }, []);

    async function handleSubmit() {
        AsyncStorage.setItem('serverURL', serverURL);
        AsyncStorage.setItem('chaveLogo', chaveLogo);
        await ConfigurationApi.setBaseURL();
        this.notification.alertWithType('success', 'Notificação', 'Configurações Salvas com Sucesso!');
    }

    return (
        <>
            <View style={styles.containerConfig}>
                <View style={styles.containerConfigForm}>
                    <View style={{ height: 50, alignItems: 'center', marginTop: 10, marginLeft: 10, marginRight: 10 }}>
                        <Input
                            style={defaultStyles.input}
                            placeholder='URL Servidor'
                            placeholderTextColor={darkColor}
                            autoCapitalize="characters"
                            autoCorrect={false}
                            leftIcon={
                                <IconFive
                                    name='link'
                                    size={24}
                                    color={primaryColor}
                                />
                            }
                            leftIconContainerStyle={{ marginRight: 25 }}
                            onSubmitEditing={() => { logoSystem.focus(); }}
                            value={serverURL}
                            onChangeText={setServerURL}
                        />
                    </View>
                    
                    <View style={{ height: 50, alignItems: 'center', marginTop: 10, marginLeft: 10, marginRight: 10 }}>
                        <Input
                            style={defaultStyles.input}
                            placeholder='Logo Alternativo'
                            placeholderTextColor={darkColor}
                            autoCapitalize="characters"
                            autoCorrect={false}
                            leftIcon={
                                <Icon
                                    name='photo'
                                    size={24}
                                    color={primaryColor}
                                />
                            }
                            leftIconContainerStyle={{ marginRight: 25 }}
                            value={chaveLogo}
                            onChangeText={setChaveLogo}
                        />
                    </View>
                    <View style={styles.buttonGroup}>
                        <Button titleStyle={styles.titleButton}
                            buttonStyle={styles.buttonConfig}
                            title='Salvar'
                            icon={
                                <Icon
                                    name="save"
                                    style={{ marginRight: 5 }}
                                    size={18}
                                    color={whiteColor}
                                />
                            }
                            onPress={() => handleSubmit()}
                            type='outline'
                        />
                    </View>
                    
                    <DropdownAlert
                        ref={ref => this.notification = ref}
                        successColor={successColor}
                        errorColor={errorColor}
                        warnColor={warningColor}
                        infoColor={infoColor}
                    />
                    <SincProgress visible={progress} title={title} message={message} />
                </View>
            </View>
        </>
    );
}