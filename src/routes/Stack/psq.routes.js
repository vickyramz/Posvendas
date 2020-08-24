import NavigationOptions from '../config/NavigationOptions';

//SCREENS
import Iniciar from '../../screens/PSQ/Iniciar';
import Perguntas from '../../screens/PSQ/Iniciar/Perguntas';
import GerarRelatorios from '../../screens/PSQ/GerarRelatorios';
import Relatorio from '../../screens/PSQ/GerarRelatorios/Relatorio';
import Impressao from '../../screens/PSQ/Impressao';

const PSQModule = {
    Iniciar: {
        screen: Iniciar,
        navigationOptions: {
            ...NavigationOptions,
            title: "Informando Dados Básicos",
        }
    },
    Perguntas: {
        screen: Perguntas,
        navigationOptions: {
            ...NavigationOptions,
            title: "Respondendo as Perguntas",
        }
    },
    GerarRelatorios: {
        screen: GerarRelatorios,
        navigationOptions: {
            ...NavigationOptions,
            title: "Gerando Relatórios",
        }
    },
    Relatorio: {
        screen: Relatorio,
        navigationOptions: {
            ...NavigationOptions,
            title: "Relatório Gerado",
        }
    },
    Impressao: {
        screen: Impressao,
        navigationOptions: {
            ...NavigationOptions,
            title: "Impressão de Formulário",
        }
    }
};

export default PSQModule;