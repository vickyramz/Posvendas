import { primaryColor, whiteColor, successColor, errorColor, warningColor, infoColor } from '../../../defaultStyles';
import { View, KeyboardAvoidingView, Platform, Text, SafeAreaView, Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import SincProgress from '../../../../components/SincProgress';
import { Button, ButtonGroup } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';
import DropdownAlert from 'react-native-dropdownalert';
import React, { useState, useEffect } from 'react';
import api from '../../../../services/api';
import Emoji from 'react-native-emoji';
import { styles } from '../styles.js';

import muitoSatisfeito from '../../../../assets/MuitoSatisfeito.png';
import satisfeito from '../../../../assets/Satisfeito.png';
import normal from '../../../../assets/Normal.png';
import poucoSatisfeito from '../../../../assets/PoucoSatisfeito.png';
import insatisfeito from '../../../../assets/Insatisfeito.png';

export default function Perguntas({ navigation }) {
    
    const [checklist, setChecklist] = useState({});

    const [placa, setPlaca] = useState('');
    const [cliente, setCliente] = useState('');
    const [telefone, setTelefone] = useState('');
    const [email, setEmail] = useState('');

    const [idChecklist, setIdChecklist] = useState('');
    const [perguntas, setPergundas] = useState([]);
    const [respostaPerguntas, setRespostaPerguntas] = useState({});

    //Loading
    const [progress, setProgress] = useState(false);
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        buscarChecklist();
    }, []);

    async function buscarChecklist() {
        setProgress(true);
        setTitle('Aguarde');
        setMessage('Carregando Perguntas...');

        let token = await AsyncStorage.getItem('token');
        api.get(`/ord/ws/checklist/buscarChecklist?token=${token}`).then(async resp => {
            const data = resp.data;
            await data.map(async item => {
                if (`${item.description}`.toUpperCase() === "BOCA DE CAIXA") {
                    
                    setPlaca(await AsyncStorage.getItem('placa'));
                    setCliente(await AsyncStorage.getItem('cliente'));
                    setTelefone(await AsyncStorage.getItem('telefone'));
                    setEmail(await AsyncStorage.getItem('email'));
                    
                    setIdChecklist(item.idChecklist);
                    return await buscarGrupoPerguntas(item);
                }
            })
        }).catch(ex => {
            if (ex.response.status === 404) {
                setProgress(false);
                this.notification.alertWithType('warn', 'Atenção', 'O Módulo ORD Não foi Localizado!');
            } else {
                setProgress(false);
                this.notification.alertWithType('error', 'Notificação', `Erro ao Encontrar o CheckList. - ${ex}`);
            }
        });
    }

    async function buscarGrupoPerguntas(checklist) {
        let token = await AsyncStorage.getItem('token');
        api.get(`/ord/ws/checklist/buscarGrupoPerguntas?token=${token}&idChecklist=${checklist.idChecklist}`).then(resp => {
            const data = resp.data;
            const grupos = data.grupos;
            grupos.map(grupo => {
                setPergundas(grupo.perguntas);
            });

            if (data.perguntasSemGrupo.length > 0) {
                setPergundas(perguntas => [...perguntas, data.perguntasSemGrupo]);
            }
        }).catch(ex => {
            if (ex.response.status === 404) {
                this.notification.alertWithType('warn', 'Atenção', 'O Módulo ORD Não foi Localizado!');
            } else {
                this.notification.alertWithType('error', 'Notificação', `Erro ao Encontrar as Perguntas do Checklist. - ${ex}`);
            }
        }).finally(() => {
            setProgress(false);
        });
    }

    function settingRespostaPerguntas(resposta, e) {
        const prop = `opcao${(e + 1)}`;
        const newState = { 
            ...respostaPerguntas, 
            [resposta.codigo]: { codigo: resposta.codigo, value: resposta[prop], index: e }
        };
        return setRespostaPerguntas(newState);
    }

    function renderPerguntas(item) {

        let componentOpcao1;
        let componentOpcao2;
        let componentOpcao3;
        let componentOpcao4;
        let componentOpcao5;

        if (item.opcao1 === ':I:') {
            componentOpcao1 = () => {
                return (
                    <Text style={styles.emojiText}>
                        <Image style={ styles.emoji } source={insatisfeito} resizeMode={'center'}/>
                    </Text>
                );
            }
        } 

        if (item.opcao2 === ':PS:') {
            componentOpcao2 = () => {
                return (
                    <Text style={styles.emojiText}>
                        <Image style={styles.emoji} source={poucoSatisfeito} resizeMode={'center'} />
                    </Text>
                );
            }
        }

        if (item.opcao3 === ':M:') {
            componentOpcao3 = () => {
                return (
                    <Text style={styles.emojiText}>
                        <Image style={styles.emoji} source={normal} resizeMode={'center'} />
                    </Text>
                );
            }
        }

        if (item.opcao4 === ':S:') {
            componentOpcao4 = () => {
                return (
                    <Text style={styles.emojiText}>
                        <Image style={styles.emoji} source={satisfeito} resizeMode={'center'} />
                    </Text>
                );
            }
        }

        if (item.opcao5 === ':MS:') {
            componentOpcao5 = () => {
                return (
                    <Text style={styles.emojiText}>
                        <Image style={styles.emoji} source={muitoSatisfeito} resizeMode={'center'} />
                    </Text>
                );
            }
        }

        const buttons = [
            item.opcao1 !== ':I:' ? item.opcao1 : { element: componentOpcao1 },
            item.opcao2 !== ':PS:' ? item.opcao2 : { element: componentOpcao2 },
            item.opcao3 !== ':M:' ? item.opcao3 : { element: componentOpcao3 },
            item.opcao4 !== ':S:' ? item.opcao4 : { element: componentOpcao4 },
            item.opcao5 !== ':MS:' ? item.opcao5 : { element: componentOpcao5 },
            item.opcao6,
            item.opcao7,
            item.opcao8,
            item.opcao9,
            item.opcao10,
            item.opcao11,
            item.opcao12
        ];

        let idx = respostaPerguntas[item.codigo] ? respostaPerguntas[item.codigo].index : undefined;

        if (item.opcao1 === ':I:' && item.opcao2 === ':PS:' && item.opcao3 === ':M:' && item.opcao4 === ':S:' && item.opcao5 === ':MS:') {
            return (
                <>
                    <Text style={styles.textQuestion}>{item.descricao}</Text>
                    <ButtonGroup
                        onPress={(e) => settingRespostaPerguntas(item, e)}
                        buttons={buttons.filter(i => i != undefined)}
                        textStyle={styles.textGroup}
                        selectedIndex={idx}
                        containerStyle={{ height: 100, borderRadius: 10, borderColor: primaryColor }} />
                </>
            );
        } else {
            return (
                <>
                    <Text style={styles.textQuestion}>{item.descricao}</Text>
                    <ButtonGroup
                        onPress={(e) => settingRespostaPerguntas(item, e)}
                        buttons={buttons.filter(i => i != undefined)}
                        textStyle={styles.textGroup}
                        selectedIndex={idx}
                        containerStyle={{ height: 50, borderRadius: 10, borderColor: primaryColor }} />
                </>
            );
        }
    }

    async function handleSubmit() {
        let token = await AsyncStorage.getItem('token');
        let emitente = await AsyncStorage.getItem('emitente');
        
        let newChecklist = {
            ...checklist,
            "token": token,
            "emitente": emitente,
            "placa": placa,
            "cliente": cliente,
            "telefone": telefone,
            "email": email,
            "idChecklist": idChecklist,
            "perguntas": perguntas,
            "respostaPerguntas": respostaPerguntas
        };
        
        setChecklist(newChecklist);

        api.post("/ord/ws/checklist/salvarSimplificado", newChecklist).then(resp => {
            this.notification.alertWithType('success', 'Atenção', resp.data.mensagem);
            
            setTimeout(() => {
                navigation.navigate('SincProgramas');
            }, 2000);
        }).catch(ex => {
            if (ex.response.status === 404) {
                this.notification.alertWithType('warn', 'Atenção', 'O Módulo ORD Não foi Localizado!');
            } else {
                this.notification.alertWithType('error', 'Notificação', `Erro ao Salvar o Checklist Simplificado - ${ex}`);
            }
        }).finally(() => {
            setProgress(false);
        });
    }

    return (
        <>
            <SafeAreaView style={{ width: '100%', height: '100%', backgroundColor: whiteColor }}>
                <KeyboardAvoidingView enabled={Platform.OS === 'IOS'} behavior="padding" style={styles.conteiner}>
                    <View style={styles.containerIniciar}>
                        <ScrollView>

                            <View style={[styles.containerIniciarForm]}>
                                <View style={styles.viewPerguntas}>
                                    {perguntas != null && perguntas.map(item => renderPerguntas(item))}
                                </View>

                                <View style={styles.buttonGroup}>
                                    <Button titleStyle={styles.titleButton}
                                        buttonStyle={[styles.button, { backgroundColor: infoColor, borderColor: infoColor }]}
                                        title='Anterior'
                                        icon={
                                            <Icon
                                                name="arrow-left"
                                                style={{ marginRight: 5 }}
                                                size={18}
                                                color={whiteColor}
                                            />
                                        }
                                        onPress={() => { return navigation.goBack();} }
                                        type='outline'
                                    />

                                    <Button titleStyle={styles.titleButton}
                                        buttonStyle={[styles.button, { backgroundColor: successColor, borderColor: successColor }]}
                                        title='Salvar'
                                        icon={
                                            <Icon
                                                name="check"
                                                style={{ marginRight: 5 }}
                                                size={18}
                                                color={whiteColor}
                                            />
                                        }
                                        onPress={() => handleSubmit()}
                                        type='solid'
                                    />
                                </View>
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
                </KeyboardAvoidingView>
            </SafeAreaView>
        </>
    );
}