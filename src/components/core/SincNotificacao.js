import { defaultStyles, primaryColor, darkColor, whiteColor } from '../../screens/defaultStyles';
import { Button, Input } from 'react-native-elements';
import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage'
import api from '../../services/api';
import { ScrollView } from 'react-native-gesture-handler';
import ConfigurationApi from '../../services/ConfigurationApi.js';
import SincEmitenteTop from '../../components/SincEmitenteTop.js';

export default function SincNotificacao({ navigation }) {

    //Loading
    const [progress, setProgress] = useState(false);
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {

    }, []);

    return (
        <>
            <SafeAreaView style={{ width: '100%', height: '100%', backgroundColor: whiteColor }}>
                <SincEmitenteTop navigation={navigation} />
                {/* DESENVOLVER A BORDA SUPERIOR DE STATUS EM AZUL */}

                {/* ADICIONAR O EMITENTE EM UM FILETE BEM PEQUENO */}
                <Text>Notification Teste</Text>

                {/* DESENVOLVER O LAYOUT DE MENU INFERIOR */}
            </SafeAreaView>
        </>
    );
}