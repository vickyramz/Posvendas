import { createStackNavigator } from 'react-navigation-stack';
import { primaryColor, whiteColor } from '../../screens/defaultStyles';

import SincPerfil from '../../components/core/SincPerfil';

//SCREENS
import Configuracao from '../../screens/core/Authentication/Configuracao';

export default createStackNavigator({
    SincPerfil: {
        screen: SincPerfil,
        navigationOptions: {
            header: null,
        },
    },
    EditarConfiguracao: {
        screen: Configuracao,
        navigationOptions: {
            headerTitleStyle: { alignSelf: 'center' },
            title: "Configurações",
            headerStyle: {
                backgroundColor: whiteColor,
            },
            headerTintColor: primaryColor,
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        }
    }
}, {
    headerLayoutPreset: 'center',
    initialRouteName: 'SincPerfil'
});