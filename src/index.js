import React from 'react';
import { StatusBar } from 'react-native';
import { Provider } from "react-redux";
import NetInfo from "@react-native-community/netinfo";

import Routes from './routes/principal.routes';

// NetInfo.isConnected.addEventListener("connectionChange", console.log);

import "./config/reactotron";
import {store,persistor} from "./store";
import SincOfflineDropdown from './components/SincOfflineDropdown';
import {PersistGate} from 'redux-persist/lib/integration/react';
console.disableYellowBox = true;

export default function App() {
    return (
        <>
            <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
                <SincOfflineDropdown />
                <Routes />
                </PersistGate>
            </Provider>
        </>
    );
}