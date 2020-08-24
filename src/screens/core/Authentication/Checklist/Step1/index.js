import { defaultStyles, primaryColor, successColor, errorColor, warningColor, infoColor, whiteColor, darkColor, selectedPrimaryColor } from '../../../../defaultStyles';
import { Button, Input } from 'react-native-elements';
import React, { useState, useEffect, Component } from 'react';
import { View, KeyboardAvoidingView, Platform, Text, Modal,AsyncStorage, StatusBar, Dimensions, SafeAreaView, Picker, StyleSheet, FlatList, ActivityIndicator, Image, TouchableHighlight, TouchableOpacity,TextInput, BackHandler,Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import SincProgress from '../../../../../components/SincProgress.js';
import api from '../../../../../services/api';
import { useNetInfo } from "@react-native-community/netinfo";
// import { onChange } from 'react-native-reanimated';

// Find Vehicle Model by Description
// Method: busca_modelo(String modelDescription) - type: GET
// URL: /ord/ws/ord/buscarModelos
// resp:{"code": "OK", "success": true}
// Parameters: [token, modelo (modelDscription)]
// Goal: Find a complete model name (using partial description) and code (also string) to use in checklist.
    class Step1 extends Component  {
        constructor(props) {
            super(props);
            this.state = {
                classobj:true,
                Pesquisa: '',
                Numero: '',
                Placa: '',
                Veiculo: '',
                Anomodelo: '',
                Prisma: '',
                Cliente: '',
                Email: '',
                Telefone: '',
                modeloval: [],
                selectedRevisao: '',
                selectedModelo: '',
                progress: false,
                title: "", 
                message: '',
                Revisao: [{"description": "Revisao"},{"description": "10.000"},{"description": "20.000"},{"description": "30.000"},{"description": "40.000"},{"description": "50.000"},{"description": "60.000"},{"description": "70.000"},{"description": "80.000"},{"description": "90.000"},{"description": "100.000"}],

            };
        }
        async componentWillReceiveProps (){
            const { Pesquisa, Numero, Placa, Veiculo, Anomodelo, Prisma, Cliente, Email, Telefone, modeloval} =this.state;
            const { defaultParams } =this.props;
            console.log("defaultParams",defaultParams)
            defaultParams.classobj ? 
            this.setState({ Pesquisa:defaultParams.Pesquisa !== '' ? defaultParams.Pesquisa : '',
                            Numero:'', 
                            Placa: defaultParams.Placa !== '' ? defaultParams.Placa : '', 
                            Veiculo: defaultParams.Veiculo !== '' ? defaultParams.Veiculo : '', 
                            Anomodelo: defaultParams.Anomodelo !== '' ? defaultParams.Anomodelo : '', 
                            Prisma: '', 
                            Cliente: defaultParams.Cliente !== '' ? defaultParams.Cliente : '',
                            Email: defaultParams.Email !== '' ? defaultParams.Email : '', 
                            Telefone: defaultParams.Telefone !== "" ? defaultParams.Telefone : '' , 
                            modeloval: defaultParams.modeloval !== "" ? modeloval : []
                        }) : 
                        this.setState({ Pesquisa:'',
                        Numero:'', 
                        Placa: defaultParams.id !== '' ? defaultParams.id : '', 
                        Veiculo: defaultParams.marca !== '' ? defaultParams.marca : '', 
                        Anomodelo: defaultParams.anoModelo !== '' ? defaultParams.anoModelo : '', 
                        Prisma: '', 
                        Cliente: defaultParams.proprietarioNome !== '' ? defaultParams.proprietarioNome : '',
                        Email: defaultParams.email !== '' ? defaultParams.email : '', 
                        Telefone: defaultParams.telefone !== "" ? defaultParams.telefone : '' , 
                        modeloval: defaultParams.marca !== "" && defaultParams.modelo !== "" ? [{'description': defaultParams.marca + defaultParams.modelo}] : []
                    })
            console.log("arrreceive prop", this.props.defaultParams)
        }

        onChange = (name, value) => {
            console.log("name",name)
            console.log("value",value)
            this.setState({[name]: value})
        }

        componentWillUnmount () {
            this.props.defalutvalChange(this.state)
        }

        searchApiCall = async () => {
            const {Pesquisa} = this.state;
            // const netInfo = useNetInfo();
            this.setState({progress: true,
                title: "", 
                message: 'Carregando...',});
            // if (netInfo.isConnected == true) {
                const token = await AsyncStorage.getItem('token');
                console.log("Token",token)
                await api.get(`/ord/ws/ord/buscarModelos?token=${token}&modelo=${Pesquisa}`).then(res =>{
                    if(res.data){
                        console.log("test",res.data)
                        this.setState({progress: false,
                        title: "", 
                        message: '',});
                    } else{
                         this.setState({progress: false});                        
                        console.log("Error first api call")
                    }
                },function(err){
                    this.setState({progress: false});                        
                    console.log("Error fun err first api call",err)
                });
            // }
        }
        render() {
            const { Revisao, selectedRevisao,progress,title,message, selectedModelo, Pesquisa, Numero, Placa, Veiculo, Anomodelo, Prisma, Cliente, Email, Telefone, modeloval} =this.state;
            const { defaultParams } = this.props.defaultParams;
            console.log("pres",Pesquisa)
            console.log("pres",modeloval)

            return (
                <View style={styles.MainContainer}>
                    <SincProgress visible={progress} title={title} message={message} /> 
                    <ScrollView showsVerticalScrollIndicator={false} >
                        <KeyboardAvoidingView enabled={true} >
                            <View style={styles.boxContainer}>
                                <TextInput placeholder='Pesquisa' placeholderTextColor="#cacaca"
                                    style={styles.inputBoxSearch}
                                    onChangeText={text => this.onChange("Pesquisa", text)}
                                    value={Pesquisa}
                                />
                                <TouchableOpacity onPress={() => this.searchApiCall()} style={styles.searchButton}>
                                    <Icon
                                        name="search"
                                        size={18}
                                        color={whiteColor}
                                /></TouchableOpacity>
                            </View>
                            <View style={styles.inputBox}>
                                <TextInput placeholder='Numero' placeholderTextColor="#cacaca"
                                    style={styles.textInputBox}
                                    onChangeText={text => this.onChange( "Numero", text )}
                                    value={Numero}
                                />
                            </View>
                            <View style={styles.inputBox}>
                                <TextInput placeholder='Placa' placeholderTextColor="#cacaca"
                                    style={styles.textInputBox}
                                    onChangeText={text => this.onChange( "Placa", text )}
                                    value={Placa}
                                />
                            </View>
                            <View style={styles.inputBox}>
                                <TextInput placeholder='Veiculo' placeholderTextColor="#cacaca"
                                    style={styles.textInputBox}
                                    onChangeText={text => this.onChange( "Veiculo", text )}
                                    value={Veiculo}
                                />
                            </View>
                            <View style={styles.inputBox}>
                                <TextInput placeholder='Anomodelo' placeholderTextColor="#cacaca"
                                    style={styles.textInputBox}
                                    onChangeText={text => this.onChange( "Anomodelo", text )}
                                    value={Anomodelo}
                                />
                            </View>
                            <View style={styles.inputBox}>
                                <TextInput placeholder='Prisma' placeholderTextColor="#cacaca"
                                    style={styles.textInputBox}
                                    onChangeText={text => this.onChange( "Prisma", text )}
                                    value={Prisma}
                                />
                            </View>
                            <View style={styles.inputBox}>
                                <TextInput placeholder='Cliente' placeholderTextColor="#cacaca"
                                    style={styles.inputBoxSearch}
                                    onChangeText={text => this.onChange("Cliente", text)}
                                    value={Cliente}
                                />
                                <TouchableOpacity style={styles.searchButton}><Icon
                                        name="search"
                                        size={18}
                                        color={whiteColor}
                                    /></TouchableOpacity>
                            </View>

                            <View style={styles.inputBox}>
                                <TextInput placeholder='Email' placeholderTextColor="#cacaca"
                                    style={styles.textInputBox}
                                    onChangeText={text => this.onChange("Email",text)}
                                    value={Email}
                                />
                            </View>
                            <View style={styles.inputBox}>
                                <TextInput placeholder='Telefone' placeholderTextColor="#cacaca"
                                    style={styles.textInputBox}
                                    onChangeText={text => this.onChange("Telefone",text)}
                                    value={Telefone}
                                    keyboardType={"numeric"}
                                />
                            </View>
                            <View style={styles.inputBox}>
                                <Picker
                                    selectedValue={selectedRevisao}
                                    style={styles.textInputBox}
                                    onValueChange={(itemValue, itemIndex) => this.onChange("selectedRevisao",itemValue)}>
                                    {Revisao.map((item, index) => {
                                        return (<Picker.Item label={item.description} value={item.description} key={index}/>) 
                                    })}
                                </Picker> 
                            </View>
                            <View style={styles.modeloText}><Text>MODELOS</Text></View>                    
                            <View style={styles.modeloContainer}>
                                <Picker 
                                    selectedValue={selectedModelo}
                                    style={styles.textInputBox}
                                    onValueChange={(itemValue, itemIndex) => this.onChange('selectedModelo',itemValue)}>
                                    {Revisao.map((item, index) => {
                                        return (<Picker.Item label={item.description} value={item.description} key={index}/>) 
                                    })}
                                </Picker> 
                            </View>
                        </KeyboardAvoidingView>
                    </ScrollView>
                </View>
                )
            }
        };
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    boxContainer:{
        flexDirection:'row', 
        borderColor: '#cacaca', 
        borderWidth: 1,
        borderRadius:10, 
    },
    MainContainer: {
        paddingHorizontal:20, 
        paddingVertical:10,
        height: windowHeight-100 
    },
    inputBoxSearch: { 
        height: 40, 
        width:windowWidth-75,
    },
    searchButton:{
        backgroundColor:'#cacaca',
        padding:10, 
        height: 40,
        borderRadius:10
    },
    inputBox: {
        flexDirection:'row', 
        borderColor: '#cacaca', 
        borderWidth: 1,
        borderRadius:10 
    },
    textInputBox: { 
        height: 40, 
        width:windowWidth-50,
    },
    modeloContainer:{
        flexDirection:'row', 
        borderColor: '#cacaca', 
        borderWidth: 1,
        borderRadius:10, 
        padding:2 
    },
    modeloText:{
        alignItems:'center',
        padding:5
    },
});

export default Step1;
