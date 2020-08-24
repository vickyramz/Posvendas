import { createStackNavigator } from 'react-navigation-stack';

import SincProgramas from '../../components/core/SincProgramas';

//MODULES
import PSQModule from '../Stack/psq.routes';
import ORDModule from '../Stack/ord.routes';

export default createStackNavigator({
    SincProgramas: {
        screen: SincProgramas,
        navigationOptions: {
            header: null,
        },
    },
    ...PSQModule,
    ...ORDModule,
}, {
    headerLayoutPreset: 'center',
    initialRouteName: 'SincProgramas'
});