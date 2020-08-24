import { StyleSheet } from 'react-native';
import { defaultStyles, primaryColor, whiteColor, darkColor } from '../../../defaultStyles';

export const styles = StyleSheet.create({
    logo: {
        marginBottom: 20, 
        width: 200, 
        height: 200
    },

    containerLogo: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: whiteColor
    },

    descriptionSystem: {
        fontSize: 18,
        color: primaryColor,
        fontWeight: 'bold',
        fontStyle: 'italic'
    },

    buttonGroup: { 
        height: 50, 
        justifyContent: 'center', 
        flexDirection: 'row', 
        margin: 10, 
        marginTop: 25 
    },

    titleButton: { 
        color: whiteColor, 
        fontWeight: 'bold' 
    },

    button: {
        height: 40,
        width: 170,
        backgroundColor: primaryColor,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },

    buttonText: {
        color: whiteColor,
        fontWeight: 'bold',
        fontSize: 16,
    }
});