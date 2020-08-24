import { StyleSheet } from 'react-native';
import { darkColor, primaryColor, whiteColor } from '../../../defaultStyles';

export const styles = StyleSheet.create({

    containerConfig: {
        flex: 1,
        flexDirection: "row",
        alignItems: "flex-start",
        backgroundColor: whiteColor
    },
    containerConfigForm: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        backgroundColor: whiteColor,
        marginBottom: 20,
        zIndex: 0
    },

    buttonConfig: {
        backgroundColor: primaryColor,
        borderRadius: 10,
        borderColor: primaryColor,
        borderWidth: 1
    },

    inputConfig: {
        height: 40,
        width: 200,
        padding: 5,
        fontSize: 16,
        borderRadius: 10,
        color: darkColor
    },

    buttonGroup: {
        height: 50, 
        justifyContent: 'flex-end',
        marginRight: 17,
        marginLeft: 17,
        marginTop: 15,
    },

    titleButton: {
        color: whiteColor,
        fontWeight: 'bold'
    },

    buttonConfig: {
        backgroundColor: primaryColor,
        borderRadius: 10,
        borderColor: primaryColor,
        borderWidth: 1,
    },

    buttonText: {
        color: whiteColor,
        fontWeight: 'bold',
        fontSize: 16,
    }
});