import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { whiteColor } from '../screens/defaultStyles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { QRScannerView } from 'react-native-qrcode-scanner-view';

function SincCamera({ onSubmit, onMenuSubmit, isMenuVisibled }) {
    function renderTitle() {
        return (
            <>
                <Text style={styles.textTitle}>Aproxime o Código de Barras Para Escanear</Text>
            </>
        )
    }

    function renderMenu() {
        if (isMenuVisibled == true) {
            return (
                <>
                    <TouchableOpacity
                        style={styles.buttonMenu}
                        onPress={onMenuSubmit}
                    >
                        <Icon
                            name='sign-language'
                            style={styles.iconMenu}
                            size={50}
                            color={whiteColor}
                        />
                        <Text style={styles.textMenu}>Informar Manualmente</Text>
                    </TouchableOpacity>
                </>
            );
        }
    }

    return (
        <View style={{ flex: 1 }}>
            < QRScannerView
                onScanResult={(event) => onSubmit(event)}
                renderFooterView={renderMenu}
                renderHeaderView={renderTitle}
                hintText={''}
                scanBarAnimateReverse={true} />
        </View>
    );
}

const styles = StyleSheet.create({
    iconMenu: {
        color: 'white',
        textAlign: 'center', 
    },

    textTitle: {
        color: 'white',
        textAlign: 'center',
        fontWeight: "bold",
        paddingTop: '40%'
    },
    
    textMenu: {
        color: 'white', 
        textAlign: 'center', 
        paddingBottom: 20
    }
});

export default SincCamera;