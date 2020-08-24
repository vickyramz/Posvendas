import { primaryColor, whiteColor, successColor, errorColor, warningColor, infoColor, darkGrayColor, darkColor } from '../../defaultStyles';
import { View, KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import SincProgress from '../../../components/SincProgress';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { ScrollView } from 'react-native-gesture-handler';
import DropdownAlert from 'react-native-dropdownalert';
import { Button, Input } from 'react-native-elements';
import { Dialog } from 'react-native-simple-dialogs';
import api from '../../../services/api';
import React, { useState } from 'react';
import { styles } from './styles.js';

export default function Iniciar({ navigation }) {
    //Dados Basicos
    const [placa, setPlaca] = useState('');
    const [placaValida, setPlacaValida] = useState(false);
    const [cliente, setCliente] = useState('');
    const [clienteValido, setClienteValido] = useState(false);
    const [dadosCliente, setDadosCliente] = useState([]);
    const [telefone, setTelefone] = useState('');
    const [email, setEmail] = useState('');

    //Loading
    const [progress, setProgress] = useState(false);
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');

    const [dialogVisible, setDialogVisible] = useState(false);
    const [dialogTitle, setDialogTitle] = useState('');

    async function searchCliente() {
        let token = await AsyncStorage.getItem('token');

        if (cliente == '') {
            this.notification.alertWithType('warn', 'Atenção', 'Peencha o Campo do Cliente Para Buscar!');
            return focusInput('cliente');
        } else {
            
            setProgress(true);
            setTitle('Aguarde');
            setMessage('Buscando os Dados do Cliente...');

            api.get(`/cadastro/ws/pessoa/visualizarPessoasPorNome?token=${token}&nome=${cliente}&page=1&max=10`).then(resp => {
                setDadosCliente(resp.data.data);
                setDialogVisible(true);
                setDialogTitle('Qual Cliente Está Buscando?');
            }).catch(ex => {
                if (ex.response.status === 404) {
                    this.notification.alertWithType('warn', 'Atenção', 'O Módulo CAD Não foi Localizado!');
                } else {
                    this.notification.alertWithType('error', 'Notificação', `Erro ao Encontrar os Dados do Cliente. - ${ex}`);
                }
            }).finally(() => {
                setProgress(false);
            });
        }
    }

    function renderListaClientes(cliente) {
        return (
            <Button
                key={cliente.nome}
                title={cliente.nome}
                titleStyle={styles.titleButtonModal}
                buttonStyle={styles.buttonModal}
                onPress={() => callbackCliente(cliente)}
                type='solid'
            />
        );
    }

    function callbackCliente(clienteSelecionado) {
        setCliente(clienteSelecionado.nome);
        if (clienteSelecionado.celular != null) {
            let ddd = clienteSelecionado.celular.ddd != null && clienteSelecionado.celular.ddd != undefined ? clienteSelecionado.celular.ddd : "";
            let telefone = clienteSelecionado.celular.telefone != null && clienteSelecionado.celular.telefone != undefined ? clienteSelecionado.celular.telefone : "";
            setTelefone(ddd != "" && telefone != "" ? ddd.toString() + telefone.toString() : "");
        } else if (clienteSelecionado.endereco.telefone != null) {
            let ddd = clienteSelecionado.endereco.telefone.ddd != undefined && clienteSelecionado.endereco.telefone.ddd != null ? clienteSelecionado.endereco.telefone.ddd : "";
            let telefone = clienteSelecionado.endereco.telefone.telefone != undefined && clienteSelecionado.endereco.telefone.telefone != null ? clienteSelecionado.endereco.telefone.telefone : "";
            setTelefone(ddd != "" && telefone != "" ? ddd.toString() + telefone.toString() : "");
        }

        setEmail(clienteSelecionado.email != null && clienteSelecionado.email != ' ' ? clienteSelecionado.email : "");
        
        setClienteValido(true);
        setDialogVisible(false);
    }

    async function searchPlaca() {
        let token = await AsyncStorage.getItem('token');

        if (placa == '') {
            this.notification.alertWithType('warn', 'Atenção', 'Peencha o Campo do Placa Para Buscar!');
            return focusInput('placa');
        } else {

            setProgress(true);
            setTitle('Aguarde');
            setMessage('Buscando os Dados do Veículo...');

            api.get(`/seg/ws/buscarDadosPorPlaca?token=${token}&placa=${placa}`).then(resp => {
                const data = resp.data;
                if (data.sucesso) {
                    setPlaca(data.placa);
                    setCliente(data.cliente);
                    setTelefone(data.telefone);
                    setEmail(data.email);
                    
                    setPlacaValida(true);
                    setClienteValido(true);
                    
                    this.notification.alertWithType('success', 'Notificação de Retorno', resp.data.mensagem);
                } else {
                    this.notification.alertWithType('warn', 'Notificação de Retorno', resp.data.mensagem);
                    setPlaca('');
                    return focusInput('placa');
                }
            }).catch(ex => {
                if (ex.response.status === 404) {
                    this.notification.alertWithType('warn', 'Atenção', 'O Módulo SEG Não foi Localizado!');
                } else {
                    this.notification.alertWithType('error', 'Notificação', `Erro ao Encontrar os Dados do Veículo. - ${ex}`);
                }
            }).finally(() => {
                setProgress(false);
            });
        }
    }

    function handleNext() {
        if (placa == null || placa == '') {
            this.notification.alertWithType('warn', 'Atenção', 'Preencha a Placa para Poder Prosseguir!');
        } else if (cliente == null || cliente == '') {
            this.notification.alertWithType('warn', 'Atenção', 'Preencha o Cliente para Poder Prosseguir!');
        } else if (placaValida && clienteValido) {
            AsyncStorage.setItem('placa', placa);
            AsyncStorage.setItem('cliente', cliente);
            AsyncStorage.setItem('telefone', telefone);
            AsyncStorage.setItem('email', email);
            return navigation.navigate("Perguntas");
        } else {
            this.notification.alertWithType('warn', 'Atenção', 'Cliente ou Placa Informado(s) é Inválido(s)!');
        }
    }

    let inputs = {};

    function focusInput(key) {
        inputs[key].focus();
    }
    
    return (
        <>
            <SafeAreaView style={{ width: '100%', height: '100%', backgroundColor: whiteColor }}>
                <KeyboardAvoidingView enabled={Platform.OS === 'IOS'} behavior="padding" style={styles.conteiner}>
                    <View style={styles.containerIniciar}>
                        <ScrollView>

                            <View style={[styles.containerIniciarForm, { paddingTop: 20 }]}>
                                <View style={{marginBottom: 15}}>
                                    <Input
                                        label="Placa"
                                        placeholder="Informe uma Placa!"
                                        placeholderTextColor={placa != '' && placa != null ? darkGrayColor : errorColor}
                                        inputContainerStyle={placa != '' && placa != null ? styles.input : styles.inputError}
                                        autoCapitalize="characters"
                                        autoCorrect={false}
                                        leftIcon={
                                            <Icon
                                                name='keyboard'
                                                size={24}
                                                color={placa != '' && placa != null ? darkGrayColor : errorColor}
                                            />
                                        }
                                        leftIconContainerStyle={{ marginRight: 10 }}
                                        rightIcon={
                                            <Icon
                                                name='search'
                                                size={24}
                                                color={primaryColor}
                                                onPress={() => searchPlaca()}
                                            />
                                        }
                                        errorStyle={{ color: 'red' }}
                                        rightIconContainerStyle={{ marginLeft: 10, marginRight: 10 }}
                                        returnKeyType={'search'}
                                        onSubmitEditing={() => searchPlaca()}
                                        maxLength={8}
                                        value={placa}
                                        onChangeText={setPlaca}
                                    />
                                </View>

                                <View style={{ marginBottom: 15 }}>
                                    <Input
                                        label="Cliente"
                                        placeholder="Informe um Cliente!"
                                        placeholderTextColor={cliente != '' && cliente != null ? darkGrayColor : errorColor}
                                        inputContainerStyle={cliente != '' && cliente != null ? styles.input : styles.inputError}
                                        autoCapitalize="characters"
                                        autoCorrect={false}
                                        leftIcon={
                                            <Icon
                                                name='user-alt'
                                                size={24}
                                                color={cliente != '' && cliente != null ? darkGrayColor : errorColor}
                                            />
                                        }
                                        leftIconContainerStyle={{ marginRight: 10 }}
                                        rightIcon={
                                            <Icon
                                                name='search'
                                                size={24}
                                                color={primaryColor}
                                                onPress={() => searchCliente()}
                                            />
                                        }
                                        rightIconContainerStyle={{ marginLeft: 10, marginRight: 10 }}
                                        returnKeyType={'search'}
                                        onSubmitEditing={() => searchCliente()}
                                        ref={input => {
                                            inputs['cliente'] = input;
                                        }}
                                        maxLength={200}
                                        value={cliente}
                                        onChangeText={setCliente}
                                    />
                                </View>

                                <View style={{ marginBottom: 15 }}>
                                    <Input
                                        label="Telefone"
                                        placeholder='Informe um Telefone!'
                                        placeholderTextColor={darkGrayColor}
                                        keyboardType="number-pad"
                                        autoCorrect={false}
                                        leftIcon={
                                            <Icon
                                                name='phone'
                                                size={24}
                                                color={darkGrayColor}
                                            />
                                        }
                                        onSubmitEditing={() => focusInput('email')}
                                        ref={input => {
                                            inputs['telefone'] = input;
                                        }}
                                        returnKeyType={'next'}
                                        maxLength={11}
                                        leftIconContainerStyle={{ marginRight: 10 }}
                                        value={telefone}
                                        onChangeText={setTelefone}
                                    />
                                </View>

                                <View style={{ marginBottom: 15 }}>
                                    <Input
                                        label="E-mail"
                                        placeholder='Informe um E-mail!'
                                        placeholderTextColor={darkGrayColor}
                                        autoCapitalize="none"
                                        keyboardType="email-address"
                                        autoCorrect={false}
                                        leftIcon={
                                            <Icon
                                                name='envelope'
                                                size={24}
                                                color={darkGrayColor}
                                            />
                                        }
                                        ref={input => {
                                            inputs['email'] = input;
                                        }}
                                        returnKeyType={'default'}
                                        maxLength={255}
                                        leftIconContainerStyle={{ marginRight: 10 }}
                                        value={email}
                                        onChangeText={setEmail}
                                    />
                                </View>

                                <Button titleStyle={styles.titleButton}
                                    buttonStyle={[styles.buttonNext, { backgroundColor: successColor, borderColor: successColor }]}
                                    title='Próximo'
                                    icon={
                                        <Icon
                                            name="arrow-right"
                                            style={{ marginRight: 5 }}
                                            size={18}
                                            color={whiteColor}
                                        />
                                    }
                                    onPress={() => handleNext()}
                                    type='solid'
                                />
                            </View>  
                        </ScrollView>
                    </View>

                    <DropdownAlert
                        ref={ref => this.notification = ref}
                        inactiveStatusBarBackgroundColor={primaryColor}
                        successColor={successColor}
                        errorColor={errorColor}
                        warnColor={warningColor}
                        infoColor={infoColor}
                    />

                    <SincProgress visible={progress} title={title} message={message} />
                    
                    <Dialog
                        titleStyle={styles.titleDialog}
                        dialogStyle={styles.dialog}
                        animationType={'slide'}
                        visible={dialogVisible}
                        title={dialogTitle}
                        onRequestClose={() => {
                            setDialogVisible(false);
                        }}
                        onTouchOutside={() => {
                            setDialogVisible(false);
                        }}
                    >
                        <ScrollView>
                            {dadosCliente != null && dadosCliente.map(cliente => renderListaClientes(cliente))}
                        </ScrollView>
                    </Dialog>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </>
    );
}
