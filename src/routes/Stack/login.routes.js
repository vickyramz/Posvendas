import { createStackNavigator } from 'react-navigation-stack';
import { primaryColor, whiteColor } from '../../screens/defaultStyles';

import Login from '../../screens/core/Authentication/Login';
import Configuracao from '../../screens/core/Authentication/Configuracao';
import Agendamentos from '../../screens/core/Authentication/Agendamentos';
import Checklist from '../../screens/core/Authentication/Checklist';
import Camera from '../../screens/core/Authentication/Checklist/checklist.js';


export default createStackNavigator({
    Login: {
        screen: Login,
        navigationOptions: {
            header: null,
        },
    },
    Configuracao: {
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
    },
    Agendamentos: {
        screen: Agendamentos,
        navigationOptions: {
            header: null,
        },
    },
    Checklist: {
        screen: Checklist,
        navigationOptions: {
            header: null,
        },
    },
    Camera: {
        screen: Camera,
        navigationOptions: {
            header: null,
        },
    }
},{
    headerLayoutPreset: 'center',
    initialRouteName: 'Login'
});