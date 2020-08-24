import { StyleSheet } from 'react-native';
import { darkColor, primaryColor, whiteColor, grayColor, darkGrayColor, errorColor } from '../../defaultStyles';

export const styles = StyleSheet.create({
    conteiner: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: grayColor
    },

    containerRelatorio: {
        flex: 1,
        flexDirection: "row",
        alignItems: "flex-start",
        backgroundColor: whiteColor
    },

    containerRelatorioForm: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        backgroundColor: whiteColor,
        marginBottom: 20,
        zIndex: 0
    },

    titleButton: {
        color: whiteColor,
        fontWeight: 'bold'
    },

    button: {
        height: 50,
        width: '96%',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 10,
        marginTop: 30,
        backgroundColor: primaryColor
    },

    dropdownTipoArquivo: {
        height: 50,
        width: '95%',
        marginBottom: 30,
        alignSelf: 'center',
    }, 
    
    input: {
        borderColor: darkColor
    },

    inputContainerStyle: {
        borderBottomWidth: 1.4,
        borderColor: darkColor,
        color: darkColor,
        fontWeight: "bold"
    }
});