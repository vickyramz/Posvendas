import { defaultStyles, grayColor, whiteColor, darkGrayColor, errorColor, darkColor } from '../../defaultStyles';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    conteiner: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: grayColor
    },

    containerIniciar: {
        flex: 1,
        flexDirection: "row",
        alignItems: "flex-start",
        backgroundColor: whiteColor
    },

    containerIniciarForm: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        backgroundColor: whiteColor,
        // marginBottom: 10,
        zIndex: 0
    },

    input: {
        borderColor: darkGrayColor
    },

    inputError: {
        borderColor: errorColor
    },

    dialogStyle: {
        borderRadius: 15,
        backgroundColor: '#f5f6fa'
    },

    titleStyles: {
        color: darkColor,
        fontWeight: "bold",
        alignSelf: "center"
    },

    button: {
        height: 50,
        width: 185,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 10,
    },

    buttonQuadrado: {
        height: 60,
        margin: 5,
        borderRadius: 10,
        borderWidth: 1
    },
});