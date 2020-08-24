import { primaryColor, whiteColor, successColor, errorColor, warningColor, infoColor, darkColor } from '../../defaultStyles';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    //Componente
    titleButton: {
        color: whiteColor,
        fontWeight: 'bold'
    },

    buttonImprimir: {
        height: 50,
        width: '96%',
        marginTop: 7,
        marginBottom: 7,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 10
    },

    input: {        
        borderColor: darkColor,
        marginTop: 10,
        borderBottomWidth: 0, 
        borderBottomColor: whiteColor
    },

    containerStyle: {
        marginTop: 35,
    },

    inputStyle: {
        textAlign: 'center'
    },

    //Dialog
    buttonImprimirDialog: {
        height: 50,
        width: '100%',
        marginTop: 50,
        marginBottom: 7,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 10
    },

    titleDialog: {
        color: darkColor,
        fontWeight: "bold"
    },

    dialog: {
        height: '55%',
        paddingBottom: 30,
        borderRadius: 15,
        backgroundColor: '#f5f6fa'
    }
});