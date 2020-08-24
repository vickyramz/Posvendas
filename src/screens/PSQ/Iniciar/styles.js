import { StyleSheet } from 'react-native';
import { darkColor, primaryColor, whiteColor, grayColor, darkGrayColor, errorColor } from '../../defaultStyles';

export const styles = StyleSheet.create({
    input: {
        borderColor: darkGrayColor
    },

    inputError: {
        borderColor: errorColor
    },

    viewHeadPerguntas: {
        flex: 1,
        paddingTop: 15,
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: grayColor,
    },

    textHeadPerguntas: {
        fontSize: 30,
        fontWeight: "bold",
        color: darkColor
    },

    viewPerguntas: {
        width: '100%',
        paddingTop: 10,
        paddingBottom: 10
    },

    textQuestion: {
        fontSize: 20,
        marginLeft: 11,
        marginTop: 20,
        fontWeight: "bold",
        color: darkColor
    },
    
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
        marginBottom: 20,
        zIndex: 0
    },

    buttonGroup: {
        height: 50,
        justifyContent: 'space-around',
        flexDirection: 'row',
        marginTop: 25
    },

    titleButton: {
        color: whiteColor,
        fontWeight: 'bold'
    },

    button: {
        height: 50,
        width: 185,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 10,
    },

    buttonNext: {
        height: 50,
        width: '96%',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 10,
        marginTop: 25
    },

    buttonModal: {
        height: 40,
        marginBottom: 10,
        backgroundColor: grayColor,
        borderRadius: 10,
        borderColor: darkGrayColor,
        borderWidth: 1,
        alignItems: "stretch"
    },

    titleButtonModal: {
        color: darkColor,
        fontWeight: 'bold'
    },

    buttonText: {
        color: whiteColor,
        fontWeight: 'bold',
        fontSize: 16,
    },

    textGroup: {
        color: primaryColor
    },

    titleDialog: {
        color: darkColor,
        fontWeight: "bold"
    },

    dialog: {
        height: '80%',
        paddingBottom: 30,
        borderRadius: 15,
        backgroundColor: '#f5f6fa'
    },

    emoji: {
        marginTop: 30,
        width: 50,
        height: 50,
    },

    emojiText: {
        height: '95%'
    }
});