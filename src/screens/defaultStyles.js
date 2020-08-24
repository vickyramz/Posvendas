import { StyleSheet } from 'react-native';



export const primaryColor = '#0978c5';
export const selectedPrimaryColor = '#1089ff';
export const successColor = "#27ae60";
export const errorColor = "#d63031";
export const warningColor = "#fbc531";
export const infoColor = "#7f8fa6";
export const whiteColor = "#ffffff";
export const grayColor = "#f1f2f6";
export const darkGrayColor = "#879094";
export const darkColor = "#2d3436";

export const defaultStyles = StyleSheet.create({
    //DefaultStyles
    conteiner: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: whiteColor
    },

    input: {
        borderWidth: 1,
        borderColor: whiteColor,
        paddingHorizontal: 20,
        fontSize: 16,
        color: darkColor,
        height: 44,
        marginBottom: 20,
        borderRadius: 2
    },

    containerBody: {
        flex: 1,
        flexDirection: "row",
        alignItems: "flex-end",
        backgroundColor: whiteColor
    },

    containerForm: {
        flex: 1,
        paddingHorizontal: 15,
        flexDirection: "column",
        justifyContent: "center",
        backgroundColor: whiteColor,
        marginBottom: 30
    },

    containerFormNotPadding: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        backgroundColor: whiteColor
    },

    // @PrimaryColor
    primaryBackground: {
        backgroundColor: primaryColor
    },

    primaryColor: {
        color: primaryColor
    },

    // @SuccessColor
    successBackground: {
        backgroundColor: successColor
    },

    successColor: {
        color: successColor
    },

    // @ErrorColor
    errorBackground: {
        backgroundColor: errorColor
    },

    errorColor: {
        color: errorColor
    },

    // @WarningColor
    warningBackground: {
        backgroundColor: warningColor
    },

    warningColor: {
        color: warningColor
    },

    // @InfoColor
    infoBackground: {
        backgroundColor: infoColor
    },

    infoColor: {
        color: infoColor
    },

    // @WhiteColor
    whiteBackground: {
        backgroundColor: whiteColor
    },

    whiteColor: {
        color: whiteColor
    },

    // @DarkColor
    darkBackground: {
        backgroundColor: darkColor
    },

    darkColor: {
        color: darkColor
    },
});