import React, { useEffect, useState } from 'react';
import { primaryColor, whiteColor, successColor, errorColor, warningColor, infoColor } from '../screens/defaultStyles';
import { StyleSheet, StatusBar, View, Text } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useNetInfo } from "@react-native-community/netinfo";
import DropdownAlert from 'react-native-dropdownalert';
import { Button } from 'react-native-elements';

function SincEmitenteTop({ navigation = '' }) {
    const [ emitente, setEmitente ] = useState('');
    const netInfo = useNetInfo();

    useEffect(() => {
        sourceEmitente();
    }, []);

    async function sourceEmitente() {
        return setEmitente(await AsyncStorage.getItem('emitente'));
    }

    async function goToEmitente() {
        if (netInfo.isConnected == true) {
            await AsyncStorage.removeItem('emitente');
            await AsyncStorage.removeItem('codigoEmitente');
            return navigation.navigate('Emitente');
        } else {
            this.notification.alertWithType('error', 'Conexão Necessária', 'É Necessário estar Conectado em Uma Rede Para Prosseguir!');
        }
    }

    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor={primaryColor} />
            <View style={styles.emitenteTopView}>
                <Button 
                    titleStyle={styles.emitenteTopText}
                    buttonStyle={styles.emitenteButton}
                    title={emitente}
                    onPress={() => goToEmitente()} 
                    type='solid'
                />
            </View>

            <DropdownAlert
                ref={ref => this.notification = ref}
                inactiveStatusBarBackgroundColor={primaryColor}
                successColor={successColor}
                errorColor={errorColor}
                warnColor={warningColor}
                infoColor={infoColor}
            />
        </>
    );

}

const styles = StyleSheet.create({
    emitenteTopView: {
        backgroundColor: primaryColor,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15
    },

    emitenteTopText: {
        color: whiteColor,
        fontWeight: "bold"
    },

    emitenteButton: {
        width: '100%',
        alignItems: 'center',
        backgroundColor: primaryColor,
        paddingTop: 5,
        paddingBottom: 5,
        marginTop: 0,
        marginBottom: 0,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15
    }
});

export default SincEmitenteTop;