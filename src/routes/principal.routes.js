import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import StackRouter from './Stack/login.routes';
import TabsRouter from './Tabs/menu.routes';

import PreCarregamento from '../screens/core/PreCarregamento';
import Emitente from '../screens/core/Emitente';

const Routes = createAppContainer(
    createSwitchNavigator({
        PreCarregamento,
        Emitente,
        StackRouter,
        TabsRouter
    })
);

export default Routes;