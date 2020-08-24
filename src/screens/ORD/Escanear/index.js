import { whiteColor } from '../../defaultStyles';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native';

import SincCamera from '../../../components/SincCamera';

export default function Escanear({ navigation }) {

    //Loading
    const [progress, setProgress] = useState(false);
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {

    }, []);

    function onSubmit(event) {
        console.log(event.type);
        console.log(event.data);
        //TODO irá buscar no banco de dados e se retornar cerreto irá mostrar o dado na tela.
    }

    function onMenuSubmit() {
        navigation.navigate('Buscar');
    }

    return (
        <>
            <SafeAreaView style={{ width: '100%', height: '100%', backgroundColor: whiteColor }}>
                <SincCamera onSubmit={(event) => onSubmit(event)} onMenuSubmit={() => onMenuSubmit()} isMenuVisibled={true} />
            </SafeAreaView>
        </>
    );
}