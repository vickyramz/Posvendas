import { whiteColor } from '../../defaultStyles';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native';

export default function Adicionar({ navigation }) {

    //Loading
    const [progress, setProgress] = useState(false);
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {

    }, []);

    return (
        <>
            <SafeAreaView style={{ width: '100%', height: '100%', backgroundColor: whiteColor }}>

            </SafeAreaView>
        </>
    );
}