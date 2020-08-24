import { primaryColor, whiteColor, successColor, errorColor, warningColor, infoColor, darkColor, darkGrayColor } from '../../defaultStyles';
import AsyncStorage from '@react-native-community/async-storage';
import SincProgress from '../../../components/SincProgress';
import Icon from 'react-native-vector-icons/FontAwesome5';
import DropdownAlert from 'react-native-dropdownalert';
import { Dialog } from 'react-native-simple-dialogs';
import React, { useEffect, useState } from 'react';
import { Button, Input } from 'react-native-elements';
import PDFView from 'react-native-view-pdf';
import { View, Text } from 'react-native';
import api from '../../../services/api';
import { styles } from './styles';

export default function Impressao() {

    const [arquivoFormulario, setArquivoFormulario] = useState('');
    const [nomeImpressoraSelecionada, setNomeImpressoraSelecionada] = useState('');
    const [quantidadeImpressao, setQuantidadeImpressao] = useState('0');

    const [formulario, setFormulario] = useState({});

    //Loading
    const [progress, setProgress] = useState(false);
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');

    const [dialogVisible, setDialogVisible] = useState(false);

    useEffect(() => {
        buscarFormulario();
    }, []);

    async function buscarFormulario() {
        let token = await AsyncStorage.getItem('token');

        setProgress(true);
        setTitle('Aguarde');
        setMessage('Abrindo Formulário...');

        api.get(`/ord/ws/checklist/gerarFormularioPesquisaSatisfacao?token=${token}`).then(resp => {
            const data = resp.data;
            if (data.sucesso === true) {
                setArquivoFormulario(data.relatorio);
                this.notification.alertWithType('success', 'Notificação', data.mensagem);
            }
        }).catch(ex => {
            if (ex.response.status === 404) {
                this.notification.alertWithType('warn', 'Atenção', 'O Módulo ORD Não foi Localizado!');
            } else {
                this.notification.alertWithType('error', 'Notificação', `Erro ao Abrir o Formulário - ${ex}`);
            }
        }).finally(() => {
            setProgress(false);
        });
    }

    function aumentaQuantidade() {
        let quantidade = parseInt(quantidadeImpressao) + 1;
        setQuantidadeImpressao(quantidade.toString());
    }

    function diminuiQuantidade() {
        if (parseInt(quantidadeImpressao) >= 1) {
            let quantidade = parseInt(quantidadeImpressao) - 1;
            setQuantidadeImpressao(quantidade.toString());
        }
    }

    async function handleImprimir() {
        setProgress(true);
        setTitle('Aguarde');
        setMessage('Carregando Impressora...');

        const emitente = await AsyncStorage.getItem('emitente');
        let codigoEmitente = emitente.split(' - ');
        const usuarioLogado = await AsyncStorage.getItem('login');
        let codigoImpressora = '%23IMP2' + `${codigoEmitente[0]}`.padStart(3, '0');

        api.get(`/troppus/tab/tab246/buscarNomeImpressoraCloud.do?emitente=${codigoEmitente[0]}&usuarioLogado=${usuarioLogado}&codigoImpressora=${codigoImpressora}`).then(resp => {
            const data = resp.data;
            if (data.sucesso) {
                setNomeImpressoraSelecionada(data.impressora);
            }
        }).catch(ex => {
            this.notification.alertWithType('error', 'Notificação', `Erro ao Carregar Nome da Impressora - ${ex}`);
        }).finally(() => {
            setProgress(false);
        });
        setDialogVisible(true);
    }

    async function handleImprimirAgora() {
        if (quantidadeImpressao >= 1) {
            setDialogVisible(false);

            setProgress(true);
            setTitle('Aguarde');
            setMessage('Imprimindo Formulários...');

            let token = await AsyncStorage.getItem('token');
            const emitente = await AsyncStorage.getItem('emitente');
            let codigoEmitente = emitente.split(' - ');
            let codigoImpressora = '%23IMP2' + `${codigoEmitente[0]}`.padStart(3, '0');

            let newFormulario = {
                ...formulario,
                "token": token,
                "nomeImpressora": nomeImpressoraSelecionada,
                "quantidadeImpressao": quantidadeImpressao,
                "arquivo": arquivoFormulario,
                "codigoImpressora": codigoImpressora,
                "emitente": codigoEmitente[0],
            };

            setFormulario(newFormulario);

            api.post("/ord/ws/checklist/imprimirFormularioPesquisa", newFormulario).then(resp => {
                this.notification.alertWithType('success', 'Atenção', resp.data.mensagem);
            }).catch(ex => {
                if (ex.response.status === 404) {
                    this.notification.alertWithType('warn', 'Atenção', 'O Módulo ORD Não foi Localizado!');
                } else {
                    this.notification.alertWithType('error', 'Notificação', `Erro ao Imprimir o Formulário - ${ex}`);
                }
            }).finally(() => {
                setProgress(false);
            });
        } else {
            this.notification.alertWithType('warn', 'Atenção', 'Informe a Quantidade de Impressão!');
        }
    }

    function renderDialogConfiguracaoImpressao() {
        
        return (
            <>
                <View style={{ height: 50, alignItems: 'center', marginTop: 20 }} >
                    <Text style={{ fontSize: 30, fontWeight: "bold", color: "black" }}>Configurações de Impressão</Text>
                </View>

                <View style={{ height: 50, alignItems: 'flex-start', marginTop: 35 }} >
                    <Text style={{ marginLeft: 8, fontSize: 16, fontWeight: "bold", color: "black" }}>Impressora Selecionada</Text>
                    <Text style={{ marginLeft: 8, fontSize: 30 }}>{nomeImpressoraSelecionada}</Text>
                </View>

                <Input
                    label="Quantidade de Cópias"
                    labelStyle={{ color: darkColor }}
                    placeholder="Cópias"
                    placeholderTextColor={darkGrayColor}
                    inputContainerStyle={ styles.input }
                    inputStyle={styles.inputStyle}
                    containerStyle={ styles.containerStyle }
                    keyboardType="number-pad"
                    autoCorrect={false}
                    leftIcon={
                        <Icon
                            name='minus'
                            size={50}
                            color={primaryColor}
                            onPress={() => diminuiQuantidade()}
                        />
                    }
                    leftIconContainerStyle={{ marginRight: 10 }}
                    rightIcon={
                        <Icon
                            name='plus'
                            size={50}
                            color={primaryColor}
                            onPress={() => aumentaQuantidade()}
                        />
                    }
                    rightIconContainerStyle={{ marginLeft: 10, marginRight: 10 }}
                    maxLength={2}
                    value={quantidadeImpressao}
                    onChangeText={setQuantidadeImpressao}
                />


                <Button titleStyle={styles.titleButton}
                    buttonStyle={[styles.buttonImprimirDialog, { backgroundColor: primaryColor, borderColor: primaryColor }]}
                    title='Imprimir Agora'
                    icon={
                        <Icon
                            name="print"
                            style={{ marginRight: 5 }}
                            size={18}
                            color={whiteColor}
                        />
                    }
                    onPress={() => handleImprimirAgora()}
                    type='solid'
                />
            </>
        )
    }

    return (
        <>
            <View style={{ flex: 1 }}>
                <PDFView
                    fadeInDuration={250.0}
                    style={{ flex: 1 }}
                    resource={arquivoFormulario}
                    resourceType="base64"
                />

                <Button titleStyle={styles.titleButton}
                    buttonStyle={[styles.buttonImprimir, { backgroundColor: primaryColor, borderColor: primaryColor }]}
                    title='Imprimir Formulário'
                    icon={
                        <Icon
                            name="print"
                            style={{ marginRight: 5 }}
                            size={18}
                            color={whiteColor}
                        />
                    }
                    onPress={() => handleImprimir()}
                    type='solid'
                />
            </View>

            <DropdownAlert
                ref={ref => this.notification = ref}
                inactiveStatusBarBackgroundColor={primaryColor}
                successColor={successColor}
                errorColor={errorColor}
                warnColor={warningColor}
                infoColor={infoColor}
                zIndex={99999}
            />

            <SincProgress visible={progress} title={title} message={message} />

            <Dialog
                titleStyle={styles.titleDialog}
                dialogStyle={styles.dialog}
                animationType={'slide'}
                visible={dialogVisible}
                onRequestClose={() => {
                    setDialogVisible(false);
                }}
                onTouchOutside={() => {
                    setDialogVisible(false);
                }}
            >
                { renderDialogConfiguracaoImpressao() }
            </Dialog>
        </>
    );
}
