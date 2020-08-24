import AsyncStorage from '@react-native-community/async-storage';
import UserData from './UserData';
import api from './api';

const ConfigurationApi = {
    setBaseURL() {
        return new Promise((resolve, reject) =>{
            let r1 = AsyncStorage.getItem('serverURL').then(res => {
                api.defaults.baseURL = "http://" + res
                return resolve();
            })
            api.interceptors.request.use(
                async (config) => {
                    if (config.url.indexOf('supervisor/login') === -1) {
                        config.headers.token = await AsyncStorage.getItem('token')
                    }
                    return config
                }, error => Promise.reject(error)
            );
            return r1;
        });
    },

    setUserData(data) {
        UserData.setUserData(data);
    },

    getUserData() {
        return UserData.getUserData();
    },

    getConfig() {
        const userData = UserData.getUserData();
        return {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                mobile: true,
                usuario: userData.usuario,
                senha: userData.senha,
                emitente: userData.emitente,
                token: userData.token,
            },
        };
    },

    alertJSON(str) {
        alert(JSON.stringify(str))
    },

    jsonToString(str) {
        return JSON.stringify(str)
    },

    ajustaImagem(img) {
        return img.replace(/data:image\/.*;base64,/, '')
    },

    getDataFormatada() {
        let d = new Date()
        return ((d.getDate() < 10) ? "0" : "") + d.getDate() + "/" +
            (((d.getMonth() + 1) < 10) ? "0" : "") + (d.getMonth() + 1) + "/" + d.getFullYear()
    },

    getHoraFormatada() {
        let d = new Date()
        return ((d.getHours() < 10) ? "0" : "") + d.getHours() + ":" +
            ((d.getMinutes() < 10) ? "0" : "") + d.getMinutes()

    }
}

export default new Proxy(ConfigurationApi, {
    get: function (target, name) {
        if(name in api){
            return api[name];
        }else if (name in target){
            return target[name];
        }
        return undefined;
    }
});