import { defaultStyles, primaryColor, whiteColor, successColor, errorColor, warningColor, infoColor, darkGrayColor, darkColor } from '../../../defaultStyles';
import AsyncStorage from '@react-native-community/async-storage';
import SincProgress from '../../../../components/SincProgress';
import DropdownAlert from 'react-native-dropdownalert';
import React, { useEffect, useState } from 'react';
import PDFView from 'react-native-view-pdf';
import api from '../../../../services/api';
import { View, Text } from 'react-native';

// import { Container } from './styles';

export default function Relatorio() {
    const [relatorioGerado, setRelatorioGerado] = useState('');

    const [progress, setProgress] = useState(false);
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        searchRelatorioPesquisa();
    }, []);

    async function searchRelatorioPesquisa() {
        let periodoInicial = await AsyncStorage.getItem('periodoInicialRelatorio');
        let periodoFinal = await AsyncStorage.getItem('periodoFinalRelatorio');
        let ano = await AsyncStorage.getItem('anoRelatorio');
        let tipoArquivo = await AsyncStorage.getItem('tipoArquivoRelatorio');
        let token = await AsyncStorage.getItem('token');

        setProgress(true);
        setTitle('Aguarde');
        setMessage('Gerando Relatório...');

        api.get(`/ord/ws/checklist/gerarRelatorioPesquisaSatisfacao?token=${token}&periodoInicial=${periodoInicial}&periodoFinal=${periodoFinal}&ano=${ano}&tipoArquivo=${tipoArquivo}`).then(resp => {
            const data = resp.data;
            if (data.sucesso === true) {
                setRelatorioGerado(data.relatorio);
                this.notification.alertWithType('success', 'Notificação', data.mensagem);
            }
        }).catch(ex => {
            if (ex.response.status === 404) {
                this.notification.alertWithType('warn', 'Atenção', 'O Módulo ORD Não foi Localizado!');
            } else {
                this.notification.alertWithType('error', 'Notificação', `Erro ao Gerar o Relatório - ${ex}`);
            }
        }).finally(() => {
            setProgress(false);
        });
    }

    return (
        <>
            <View style={{ flex: 1 }}>
                <PDFView
                    fadeInDuration={250.0}
                    style={{ flex: 1 }}
                    resource={relatorioGerado}
                    resourceType="base64"
                />
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
        </>
    );
}
