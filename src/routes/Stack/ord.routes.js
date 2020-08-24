import NavigationOptions from '../config/NavigationOptions';

//SCREENS
import Adicionar from '../../screens/ORD/Adicionar';
import Buscar from '../../screens/ORD/Buscar';
import Escanear from '../../screens/ORD/Escanear';

const ORDModule = {
    Adicionar: {
        screen: Adicionar,
        navigationOptions: {
            ...NavigationOptions,
            title: "Adicionando O.S",
        }
    },
    Editar: {
        screen: Adicionar,
        navigationOptions: {
            ...NavigationOptions,
            title: "Editando O.S",
        }
    },
    Buscar: {
        screen: Buscar,
        navigationOptions: {
            ...NavigationOptions,
            title: "Buscando O.S",
        }
    },
    Escanear: {
        screen: Escanear,
        navigationOptions: {
            ...NavigationOptions,
            title: "Escaneando O.S",
        }
    }
};

export default ORDModule;