import { createStackNavigator } from 'react-navigation-stack';
import { primaryColor, whiteColor } from '../../screens/defaultStyles';

import SincNotificacao from '../../components/core/SincNotificacao';

export default createStackNavigator({
    SincNotificacao: {
        screen: SincNotificacao,
        navigationOptions: {
            header: null,
        },
    },
}, {
    headerLayoutPreset: 'center',
    initialRouteName: 'SincNotificacao'
});