import React from 'react';
import { StyleSheet } from 'react-native';
import { ConfirmDialog } from 'react-native-simple-dialogs';
import { darkColor } from '../screens/defaultStyles';

function SincAlert({ visible = false, title = '', message = '' }) {

    return (
        <>
            <ConfirmDialog
                title={title != null && title != '' ? title : 'Atenção'}
                visible={visible}
                message={message}
                style={dialogStyles}
                titleStyle={titleStyles}
                messageStyle={messageStyles}
                positiveButton={{
                    title: "Confirmar",
                    onPress: () => visible = false
                }} 
            />
        </>
    );

}

const styles = StyleSheet.create({
    dialogStyles: {
        borderRadius: 15,
        backgroundColor: '#f5f6fa'
    },
    titleStyles: {

    },
    messageStyles: {
        color: darkColor,
        fontWeight: "bold"
    }
});

export default SincAlert;