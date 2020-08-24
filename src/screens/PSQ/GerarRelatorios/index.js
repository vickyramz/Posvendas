import { primaryColor, whiteColor, successColor, errorColor, warningColor, infoColor, darkColor } from '../../defaultStyles';
import { View, KeyboardAvoidingView, Platform, SafeAreaView, Text } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Dropdown } from 'react-native-material-dropdown';
import { ScrollView } from 'react-native-gesture-handler';
import DropdownAlert from 'react-native-dropdownalert';
import { Button, Input } from 'react-native-elements';
import React, { useState } from 'react';
import { styles } from './styles';

export default function GerarRelatorios({ navigation }) {
    const [periodoInicial, setPeriodoInicial] = useState('');
    const [modalPeriodoInicial, setModalPeriodoInicial] = useState(false);

    const [periodoFinal, setPeriodoFinal] = useState('');
    const [modalPeriodoFinal, setModalPeriodoFinal] = useState(false);
    
    const [ano, setAno] = useState('');
    const [tipoArquivo, setTipoArquivo] = useState('');

    let dataTipoArquivo = [
        { value: 'PDF' }, 
        { value: 'EXCEL' }
    ];

    function verificaTipoIcone() {

        let icone;
        if (tipoArquivo == "PDF") {
            icone = "file-pdf";
        } else if (tipoArquivo == "EXCEL") {
            icone = "file-excel";
        } else {
            icone = "file";
        }

        return icone;
    }

    function trocarValorPeriodoInicial(data) {
        setModalPeriodoInicial(false);
        return setPeriodoInicial(formatarData(data));
    }

    function trocarValorPeriodoFinal(data) {
        setModalPeriodoFinal(false);
        return setPeriodoFinal(formatarData(data));
    }

    function formatarData(data) {
        let dia = data.getDate().toString().padStart(2, '0');
        let mes = (data.getMonth() + 1).toString().padStart(2, '0');
        let ano = data.getFullYear();
        return dia + "/" + mes + "/" + ano;
    }

    function ultimosAnos() {
        let ano = new Date().getFullYear();
        let listaAnos = [];
        let count = 0;
        do {
            listaAnos.push({ value: ano-- });
            count++;
        } while(count < 20);
        return listaAnos;
    }

    function handleGerarRelatorio() {
        if ((periodoInicial == '' && periodoFinal == '') && ano == '') {
            this.notification.alertWithType('warn', 'Atenção', 'Informe o Periodo Inicial e Final ou o Ano!');
        } else if (tipoArquivo == '') {
            this.notification.alertWithType('warn', 'Atenção', 'Informe o Tipo de Arquivo Desejado!');
        } else {
            AsyncStorage.setItem('periodoInicialRelatorio', periodoInicial == '' ? " " : periodoInicial);
            AsyncStorage.setItem('periodoFinalRelatorio', periodoFinal == '' ? " " : periodoFinal);
            AsyncStorage.setItem('anoRelatorio', ano == '' ? " " : ano.toString());
            AsyncStorage.setItem('tipoArquivoRelatorio', tipoArquivo == '' ? " " : tipoArquivo);

            return navigation.navigate('Relatorio');
        }
    }

    return (
        <> 
            <SafeAreaView style={{ width: '100%', height: '100%', backgroundColor: whiteColor }}>
                <KeyboardAvoidingView enabled={Platform.OS === 'IOS'} behavior="padding" style={styles.conteiner}>
                    <View style={styles.containerRelatorio}>
                        <ScrollView>
                            <View style={[styles.containerRelatorioForm, { paddingTop: 20 }]}>
                                <View style={{ height: 50, alignItems: 'center', marginTop: 20 }} >
                                    <Text style={{ fontSize: 30, fontWeight: "bold", color: "black" }}>Relatório por Consultor Técnico</Text>
                                </View>

                                <View style={{ marginBottom: 15, marginTop: 15 }}>
                                    <Input
                                        label="Periodo Inicial"
                                        placeholder="Informe o Periodo Inicial!"
                                        placeholderTextColor={darkColor}
                                        inputContainerStyle={styles.input}
                                        keyboardType="number-pad"
                                        autoCorrect={false}
                                        leftIcon={
                                            <Icon
                                                name='calendar-alt'
                                                size={24}
                                                color={darkColor}
                                            />
                                        }
                                        onTouchStart={() => setModalPeriodoInicial(true)}
                                        leftIconContainerStyle={{ marginRight: 10 }}
                                        maxLength={10}
                                        value={periodoInicial}
                                        onChangeText={setPeriodoInicial}
                                    />
                                </View>

                                <DateTimePicker
                                    date={new Date()}
                                    mode="date"
                                    datePickerModeAndroid="calendar"
                                    isVisible={modalPeriodoInicial}
                                    onCancel={() => setModalPeriodoInicial(false)}
                                    onConfirm={(date) => trocarValorPeriodoInicial(date) } 
                                />

                                <View style={{ marginBottom: 15, marginTop: 15 }}>
                                    <Input
                                        label="Periodo Final"
                                        placeholder="Informe o Periodo Final!"
                                        placeholderTextColor={darkColor}
                                        inputContainerStyle={styles.input}
                                        keyboardType="number-pad"
                                        autoCorrect={false}
                                        leftIcon={
                                            <Icon
                                                name='calendar-alt'
                                                size={24}
                                                color={darkColor}
                                            />
                                        }
                                        onTouchStart={() => setModalPeriodoFinal(true)}
                                        leftIconContainerStyle={{ marginRight: 10 }}
                                        maxLength={10}
                                        value={periodoFinal}
                                        onChangeText={setPeriodoFinal}
                                    />
                                </View>

                                <DateTimePicker
                                    date={new Date()}
                                    mode="date"
                                    datePickerModeAndroid="calendar"
                                    isVisible={modalPeriodoFinal}
                                    onCancel={() => setModalPeriodoFinal(false)}
                                    onConfirm={(date) => trocarValorPeriodoFinal(date)} 
                                />

                                <View style={{ height: 50, alignItems: 'center', marginTop: 20 }} >
                                    <Text style={{ fontSize: 30, fontWeight: "bold", color: "black" }}>Relatório Geral</Text>
                                </View>

                                <Dropdown
                                    label='Ano'
                                    containerStyle={styles.dropdownTipoArquivo}
                                    data={ultimosAnos()}
                                    value={ano}
                                    inputContainerStyle={styles.inputContainerStyle}
                                    textColor={darkColor}
                                    itemCount={6}
                                    labelFontSize={16}
                                    onChangeText={value => setAno(value)}
                                />

                                <Dropdown
                                    label='Tipo de Arquivo'
                                    containerStyle={styles.dropdownTipoArquivo}
                                    data={dataTipoArquivo}
                                    value={tipoArquivo}
                                    inputContainerStyle={styles.inputContainerStyle}
                                    textColor={darkColor}
                                    itemCount={6}
                                    labelFontSize={16}
                                    onChangeText={value => setTipoArquivo(value)}
                                />

                                <Button titleStyle={styles.titleButton}
                                    buttonStyle={styles.button}
                                    title='Gerar Relatório'
                                    disabled={tipoArquivo != '' ? false : true}
                                    icon={
                                        <Icon
                                            name={verificaTipoIcone()}
                                            style={{ marginRight: 5 }}
                                            size={18}
                                            color={whiteColor}
                                        />
                                    }
                                    onPress={() => handleGerarRelatorio()}
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

                </KeyboardAvoidingView>
            </SafeAreaView>
        </>
    );
}
