import { primaryColor, darkColor, whiteColor, errorColor } from '../../screens/defaultStyles';
import { Button } from 'react-native-elements';
import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView,  StyleSheet } from 'react-native';
import { Avatar } from 'react-native-elements';

import { Dialog } from "react-native-simple-dialogs";
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';

import SincProgress from '../../components/SincProgress';
import SincEmitenteTop from '../../components/SincEmitenteTop.js';

import UserData from '../../services/UserData';

export default function SincPerfil({ navigation }) {

    const [dialogDeslogar, setDialogDeslogar] = useState(false);
    const [usuario, setUsuario] = useState({});

    //Loading
    const [progress, setProgress] = useState(false);
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        searchUsuario();
    }, []);

    async function searchUsuario() {
        setUsuario(UserData.getUserData());
    }

    function handleConfigurations() {
        return navigation.navigate('EditarConfiguracao');
    }

    function handleDisconnect() {
        return setDialogDeslogar(true);
    }

    function handleConfirmDisconnect() {
        setDialogDeslogar(false);
        return navigation.navigate('Login');
    }

    function handleCancelDisconnect() {
        return setDialogDeslogar(false);
    }

    function renderUserInformations() {
        return (
            <>
                <Avatar
                    size={200}
                    rounded
                    title={ usuario.abreviacaoNomeUsuario }
                    activeOpacity={0.7}
                    containerStyle={styles.containerAvatar}
                />

                <View style={styles.viewInfosUser}>
                    <View style={styles.gridTitleInfosUser}>
                        <Text style={styles.textInfosUser}>Usuário: </Text>
                        <Text style={styles.textInfosUser}>Nome: </Text>
                        <Text style={styles.textInfosUser}>Email: </Text>
                        <Text style={styles.textInfosUser}>Cargo: </Text>
                    </View>

                    <View style={styles.gridInfosUser}>
                        <Text style={styles.textInfosUser}>{ usuario.usuario }</Text>
                        <Text style={styles.textInfosUser}>{ usuario.nomeUsuario }</Text>
                        <Text style={styles.textInfosUser}>{ usuario.email }</Text>
                        <Text style={styles.textInfosUser}>{ usuario.tipoPessoaInterna }</Text>
                    </View>
                </View>

                <View style={styles.buttonGroup}>
                    <Button titleStyle={styles.titleButton}
                        buttonStyle={[styles.button, { backgroundColor: primaryColor, borderColor: primaryColor }]}
                        title='Configurações'
                        icon={
                            <Icon
                                name="cog"
                                style={{ marginRight: 5 }}
                                size={18}
                                color={whiteColor}
                            />
                        }
                        onPress={() => handleConfigurations()}
                        type='outline'
                    />

                    <Button titleStyle={styles.titleButton}
                        buttonStyle={[styles.button, { backgroundColor: errorColor, borderColor: errorColor }]}
                        title='Desconectar-se'
                        icon={
                            <Icon
                                name="sign-out-alt"
                                style={{ marginRight: 5 }}
                                size={18}
                                color={whiteColor}
                            />
                        }
                        onPress={() => handleDisconnect()}
                        type='solid'
                    />
                </View>

                <Dialog
                    visible={dialogDeslogar}
                    dialogStyle={styles.dialogStyle}
                    title='Tem Certeza que Deseja Desconectar-se?'
                    titleStyle={styles.titleStyles}
                >
                    <Button
                        buttonStyle={[styles.buttonDesconectar, { backgroundColor: errorColor, borderColor: errorColor }]}
                        title="Confirmar"
                        icon={
                            <Icon
                                name="check"
                                size={20}
                                color="#fff"
                                style={{ marginRight: 15 }}
                            />
                        }
                        onPress={() => handleConfirmDisconnect()}
                    />
                    <Button
                        buttonStyle={[styles.buttonDesconectar, { backgroundColor: primaryColor, borderColor: primaryColor }]}
                        title="Cancelar"
                        icon={
                            <Icon
                                name="times"
                                size={20}
                                color="#fff"
                                style={{ marginRight: 15 }}
                            />
                        }
                        onPress={() => handleCancelDisconnect()}
                    />
                </Dialog>
            </>
        );
    }

    return (
        <>
            <SafeAreaView style={{ width: '100%', height: '100%', backgroundColor: whiteColor }}>
                <SincEmitenteTop navigation={navigation} />
                
                <View style={styles.viewUser} >
                    <Text style={styles.textUser}>Dados do Usuário</Text>
                </View>

                <View style={styles.containerUser}>
                    <View style={styles.containerUserBody}>
                        <ScrollView>
                            {renderUserInformations()}
                        </ScrollView>
                    </View>
                    <SincProgress visible={progress} title={title} message={message} />
                </View>
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    viewUser: {
        height: 70,
        alignItems: 'center',
        paddingTop: 17,
        backgroundColor: whiteColor,
    },

    textUser: {
        fontSize: 30,
        fontWeight: "bold",
        color: darkColor
    },

    gridTitleInfosUser: {
        flex: 4,
        flexDirection: "column",
        flexGrow: 1,
    },

    gridInfosUser: {
        flex: 4,
        flexDirection: "column",
    },

    viewInfosUser: {
        flex: 3,
        flexDirection: "row",
        marginTop: 30,
        marginLeft: 30,
        marginRight: 30
    },

    textInfosUser: {
        fontSize: 20,
        color: darkColor,
        paddingTop: 10,
    },

    containerUser: {
        flex: 1,
        flexDirection: "row",
        alignItems: "flex-start",
        backgroundColor: '#f1f1f1',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },

    containerUserBody: {
        flex: 2,
        flexDirection: "column",
        justifyContent: "center"
    },

    containerAvatar: {
        flexDirection: "row", 
        alignSelf: "center",
        marginTop: 50,
    },

    buttonGroup: {
        height: 50,
        justifyContent: 'space-around',
        flexDirection: 'row',
        marginTop: 50
    },

    titleButton: {
        color: whiteColor,
        fontWeight: "bold"
    },

    button: {
        height: 50,
        width: 185,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 10,
    },

    buttonDesconectar: {
        height: 60,
        margin: 5,
        borderRadius: 10,
        borderWidth: 1
    },

    dialogStyle: {
        borderRadius: 15,
        backgroundColor: '#f5f6fa'
    },

    titleStyles: {
        color: darkColor,
        fontWeight: "bold",
        alignSelf: "center"
    }
});