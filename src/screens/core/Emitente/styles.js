import { StyleSheet } from 'react-native';
import { primaryColor, whiteColor } from '../../defaultStyles';

export const styles = StyleSheet.create({
    viewEmitente: { 
        height: 50, 
        alignItems: 'center', 
        paddingTop: 10,
        paddingBottom: 50,
        backgroundColor: primaryColor,
        borderBottomRightRadius: 27,
        borderBottomLeftRadius: 27
    },

    textEmitente: { 
        fontSize: 30, 
        fontWeight: "bold", 
        color: whiteColor 
    },

    titleButton: {
        color: whiteColor,
        fontWeight: "bold"
    },

    button: {
        height: 70,
        paddingTop: 20,
        paddingBottom: 20,
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        backgroundColor: primaryColor,
        borderRadius: 10,
        borderColor: primaryColor,
        borderWidth: 1,
        alignItems: "stretch"
    }
});