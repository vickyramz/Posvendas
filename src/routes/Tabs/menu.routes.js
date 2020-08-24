import React from 'react';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { StyleSheet } from 'react-native';

import SincDashboard from '../../components/core/SincDashboard';
import SincMenu from '../../components/core/SincMenu';
import SincProgramas from '../core/programas.routes';
import SincNotificacao from '../core/notificacao.routes';
import SincPerfil from '../core/perfil.routes';

import { primaryColor, darkColor, grayColor, infoColor } from '../../screens/defaultStyles';
import Icon from 'react-native-vector-icons/FontAwesome';

export default createMaterialBottomTabNavigator({
    SincDashboard: {
        screen: SincDashboard,
        navigationOptions: {
            tabBarLabel: 'Dashboard',
            tabBarIcon: ({tintColor})=>(
                <Icon name='home' color={tintColor} size={32} style={{ alignItems: 'center', width: 30 }}/>
            )
        },
    },
    SincMenu: {
        screen: SincMenu,
        navigationOptions: {
            tabBarLabel: 'Módulos',
            tabBarIcon: ({ tintColor }) => (
                <Icon name='th-large' color={tintColor} size={30} style={{ alignItems: 'center', width: 37 }}/>
            )
        },
    },
    SincProgramas: {
        screen: SincProgramas,
        navigationOptions: {
            tabBarLabel: 'Programas',
            tabBarIcon: ({ tintColor }) => (
                <Icon name='tasks' color={tintColor} size={30} style={{ alignItems: 'center', width: 30 }}/>
            )
        },
    },
    SincNotificacao: {
        screen: SincNotificacao,
        navigationOptions: {
            tabBarLabel: 'Notificação',
            tabBarIcon: ({ tintColor }) => (
                <Icon name='bell' color={tintColor} size={30} style={{ alignItems: 'center', width: 30 }}/>
            )
        },
    },
    SincPerfil: {
        screen: SincPerfil,
        navigationOptions: {
            tabBarLabel: 'Perfil',
            tabBarIcon: ({ tintColor }) => (
                <Icon name='user' color={tintColor} size={30} style={{  alignItems: 'center', width: 30 }}/>
            )
        },
    },
}, {
        initialRouteName: 'SincMenu',
        activeColor: primaryColor,
        inactiveColor: darkColor,
        barStyle: {
            backgroundColor: grayColor,
            borderTopColor: infoColor,
            paddingBottom: 10,
            borderTopWidth: StyleSheet.hairlineWidth,
            borderStyle: 'solid',
        },
        labeled: false,
        tabBarPosition: 'bottom',
        animationEnabled: true,
        swipeEnabled: true,
});