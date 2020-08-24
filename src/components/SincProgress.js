import React from 'react';
import { StyleSheet } from 'react-native';
import { ProgressDialog } from 'react-native-simple-dialogs';
import { primaryColor, darkColor } from '../screens/defaultStyles';

function SincProgress({ visible = false, title = '', message = ''}) {
    return (
        <>
            <ProgressDialog
                visible={visible}
                title={title}
                message={message}
                messageStyle={styles.messageStyles}
                activityIndicatorColor={primaryColor}
                activityIndicatorSize={40}
                activityIndicatorStyle={styles.activityIndicatorStyles}
                dialogStyle={styles.dialogStyles}
            />
        </>
    )
}

const styles = StyleSheet.create({
    activityIndicatorStyles: {

    },
    dialogStyles: {
        borderRadius: 15,
        backgroundColor: '#f5f6fa'
    },
    messageStyles: {
        color: darkColor,
        fontWeight: "bold"
    }
});

export default SincProgress;