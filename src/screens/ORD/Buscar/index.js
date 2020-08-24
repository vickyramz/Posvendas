import { whiteColor, primaryColor, darkGrayColor, errorColor, successColor, warningColor, infoColor,  } from '../../defaultStyles';
import { SafeAreaView, KeyboardAvoidingView, View, Text } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Input, Card, Button } from 'react-native-elements';
import { Dialog } from "react-native-simple-dialogs";
import { styles } from './styles.js';
import Logo from '../../../assets/SINC.png';
import SincCard from '../../../components/SincCard';
import api from '../../../services/api';
import DropdownAlert from 'react-native-dropdownalert';
import SincProgress from '../../../components/SincProgress';

export default function Buscar({ navigation }) {

    const [placa, setPlaca] = useState('');
    const [ordens, setOrdens] = useState([]);
    const [ordemSelecionada, setOrdemSelecionada] = useState({});
    const [dialogExcluirOrdem, setDialogExcluirOrdem] = useState(false);
    
    //Loading
    const [progress, setProgress] = useState(false);
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {

    }, []);

    async function searchOrdem() {
        let token = await AsyncStorage.getItem('token');
        let emitente = await AsyncStorage.getItem('codigoEmitente');

        setProgress(true);
        setTitle('Aguarde');
        setMessage('Buscando os Dados da OS...');

        try {
            if (!placa) {
                return this.notification.alertWithType('warn', 'Atenção', 'Informe a OS para Buscar!');
            }
            const result = await api.get(`/ord/ws/ord/buscarOrdemServico?token=${token}&placa=${placa}&emitente=${emitente}&isOrdem=true`);
            if (result.data.sucesso) {
                setOrdens(result.data.ordens);
            } else {
                this.notification.alertWithType('error', 'Erro Identificado', 'Nenhum Registro foi Encontado!');
            }
        } catch(err) {

        } finally {
            setProgress(false);
        }
    }

    function handleEditarOrdem(item) {
        setOrdemSelecionada(item);
        AsyncStorage.setItem('ordem',JSON.stringify(item));
        return navigation.navigate('Editar');
    }

    function handleImprimirOrdem(item) {
        setOrdemSelecionada(item);
        AsyncStorage.setItem('ordem', JSON.stringify(item));
    }

    function handleConfirmarExclusao(item) {
        setOrdemSelecionada(item);
        return setDialogExcluirOrdem(true);
    }

    async function handleCancelExcluirOrdem(item) {
        return setDialogExcluirOrdem(false);
    }

    async function handleConfirmExcluirOrdem(item) {
        setDialogExcluirOrdem(false);

        console.log('emitido o cancelamento da ordem');
    }

    function renderOrdens(item) {
        let numeroOrdem = item.numeroOrdem ? `Número da OS: ${item.numeroOrdem}\n` : '';
        let placa = item.plate ? `Placa: ${item.plate}\n` : '';
        let status;
        item.services.forEach(service => {
            status = service && service.status ? service.status : '';
        });
        status = item.services.length !== 0 ? `Status: ${status}\n` : '';
        let descricaoAtividade = item.descricaoAtividade ? `Atividade: ${item.descricaoAtividade}\n` : '';
        let dataPrevisao = item.dataPrevisao ? `Previsão de Entrega: ${item.dataPrevisao} - ` : '';
        let horaPrevisao = item.horaPrevisao ? `${item.horaPrevisao}\n\n` : '\n\n';
        
        //Dados do Cliente
        let telefone = item.telefone || item.telefone ? `Telefone: (${item.ddd}) ${item.telefone}\n` : '';
        let email = item.email ? `E-mail: ${item.email}\n` : '';
        let consultor = item.consultor ? `Consultor: ${item.consultor}\n` : '';
        let contentBody = numeroOrdem + placa + status + descricaoAtividade + dataPrevisao + horaPrevisao + telefone + email + consultor;

        return (
            <>
                <SincCard
                    titleCard={item.nomeCliente}
                    titleButton={'Editar'}
                    isBotaoEditar={true}
                    fnBotaoEditar={() => handleEditarOrdem(item)}
                    isBotaoImprimir={true}
                    fnBotaoImprimir={() => handleImprimirOrdem(item)}
                    isBotaoExcluir={true}
                    fnBotaoExcluir={() => handleConfirmarExclusao(item)}
                    contentBody={contentBody}
                />
            </>
        );
    }

    return (
        <>
            <SafeAreaView style={{ width: '100%', height: '100%', backgroundColor: whiteColor }}>
                <KeyboardAvoidingView enabled={Platform.OS === 'IOS'} behavior="padding" style={styles.conteiner}>
                    <View style={styles.containerIniciar}>
                        <ScrollView>
                            <View style={[styles.containerIniciarForm, { paddingTop: 20 }]}>
                                <View style={{ marginBottom: 10 }}>
                                    <Input
                                        label="Ordem"
                                        placeholder="Informe uma Ordem!"
                                        placeholderTextColor={placa != '' && placa != null ? darkGrayColor : errorColor}
                                        inputContainerStyle={placa != '' && placa != null ? styles.input : styles.inputError}
                                        autoCapitalize="characters"
                                        autoCorrect={false}
                                        leftIcon={
                                            <Icon
                                                name='file-invoice-dollar'
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
                                                onPress={() => searchOrdem()}
                                            />
                                        }
                                        errorStyle={{ color: 'red' }}
                                        rightIconContainerStyle={{ marginLeft: 10, marginRight: 10 }}
                                        returnKeyType={'search'}
                                        onSubmitEditing={() => searchOrdem()}
                                        maxLength={8}
                                        value={placa}
                                        onChangeText={setPlaca}
                                    />
                                </View>
                            </View>
                            
                            {ordens != null && ordens.map(item => renderOrdens(item))}

                            <Dialog
                                visible={dialogExcluirOrdem}
                                dialogStyle={styles.dialogStyle}
                                title={`Tem Certeza que Deseja Excluir a Ordem ${ordemSelecionada.numeroOrdem}?`}
                                titleStyle={styles.titleStyles}
                            >
                                <Button
                                    buttonStyle={[styles.buttonQuadrado, { backgroundColor: errorColor, borderColor: errorColor }]}
                                    title="Confirmar"
                                    icon={
                                        <Icon
                                            name="check"
                                            size={20}
                                            color="#fff"
                                            style={{ marginRight: 15 }}
                                        />
                                    }
                                    onPress={() => handleConfirmExcluirOrdem()}
                                />
                                <Button
                                    buttonStyle={[styles.buttonQuadrado, { backgroundColor: primaryColor, borderColor: primaryColor }]}
                                    title="Cancelar"
                                    icon={
                                        <Icon
                                            name="times"
                                            size={20}
                                            color="#fff"
                                            style={{ marginRight: 15 }}
                                        />
                                    }
                                    onPress={() => handleCancelExcluirOrdem()}
                                />
                            </Dialog>
                        </ScrollView>
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>

            <DropdownAlert
                ref={ref => this.notification = ref}
                inactiveStatusBarBackgroundColor={primaryColor}
                successColor={successColor}
                errorColor={errorColor}
                warnColor={warningColor}
                infoColor={infoColor}
            />

            <SincProgress visible={progress} title={title} message={message} />
        </>
    );
}