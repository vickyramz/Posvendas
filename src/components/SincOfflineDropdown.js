import React, { useState, useEffect } from 'react';
import { useNetInfo } from "@react-native-community/netinfo";
import DropdownAlert from 'react-native-dropdownalert';
import { primaryColor, successColor, errorColor, warningColor, infoColor } from '../screens/defaultStyles';

export default function SincOfflineDropdown() {
    const netInfo = useNetInfo();
    let time = 2000;
    const [ count , setCount ] = useState(0);

    useEffect(() => {
        if(count > 0){
            let messageConnection = netInfo.isConnected ? 'Sessão está Online!' : 'Sessão está Offline!';
            let type = netInfo.isConnected ? 'success' : 'error';
            time = netInfo.isConnected ? 2000 : 4000;
            this.notification.alertWithType(type, 'Notificação de Conexão', messageConnection);
        }
        setCount(count + 1);
    }, [netInfo.isConnected]);

    return(
        <>
            <DropdownAlert
                ref={ref => this.notification = ref}
                inactiveStatusBarBackgroundColor={!netInfo.isConnected ? errorColor : primaryColor}
                closeInterval={time}
                successColor={successColor}
                errorColor={errorColor}
                warnColor={warningColor}
                infoColor={infoColor}
            />
        </>
    );
}