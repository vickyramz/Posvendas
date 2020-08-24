import { primaryColor, darkColor, whiteColor, defaultStyles, successColor, errorColor, warningColor, infoColor } from '../../../defaultStyles.js';
import { Button, Input } from 'react-native-elements';
import React, { useState, useEffect } from 'react';
import { styles } from './styles.js';
import { View, TouchableOpacity,BackHandler, SafeAreaView, Text,Alert, StyleSheet, FlatList, ActivityIndicator, Image,  } from 'react-native';
import { useNetInfo } from "@react-native-community/netinfo";
import AsyncStorage from '@react-native-community/async-storage';
import SincProgress from '../../../../components/SincProgress.js';
import ConfigurationApi from '../../../../services/ConfigurationApi';
import IconFive from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/FontAwesome';
import DropdownAlert from 'react-native-dropdownalert';
import SincEmitenteTop from '../../../../components/SincEmitenteTop.js';
import api from '../../../../services/api';


export default function Agendamentos({ navigation }) {

    const netInfo = useNetInfo();

    const [serverURL, setServerURL] = useState('');
    const [chaveLogo, setChaveLogo] = useState('');

    //Loading
    const [progress, setProgress] = useState(false);
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('carregando...');
    //card data list
    const [Userdata, setUserdata] = useState([]);
    const [seletedbox, SelectedBox] = useState();
    const [userId, setUserId] = useState('');
    const [count, setCount] = useState(0);
    const [prevbtnenab, setPrevbtn] = useState(true);
    const [tickenab, setTickbtn] = useState(true);
    const [setselectdata, setSelectData] = useState('');
    const [setdate, setSelectDate] = useState('');



    useEffect(() => {
        setTimeout(async () => {
            setProgress(true);
            AsyncStorage.getItem('token').then(async token => {
                if (token != null) {
                    await agendamento();
                    setMessage('carregando...')
                } else {
                    setProgress(false);
                }
            })            
        }, 1500);
        BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        return () => {
          BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
        };
        }, []);

    handleBackButtonClick = () => {
        navigation.navigate('SincDashboard')
        // navigation.goBack();
        return true;
    }

    agendamento = async () =>{
        if (netInfo.isConnected == true) {
            const token = await AsyncStorage.getItem('token');
            const emitente = await AsyncStorage.getItem('codigoEmitente');
            console.log("Token",token)
            await api.get("/sinwcad/mobile/consultaJsonAjax.do?nome=AGEMOV_MOB&programa=ORD0000",null,{headers:{'emitente':emitente,'token':token}}).then(res =>{
                if(res.data){
                    setUserId(res.data);
                    listAgendamento(res.data, token, emitente);
                } else{
                    // return res;
                    setProgress(false);
                    console.log("Error first api call")
                }
            },function(err){
                // this.finaliza(err);
                // return err;
                setProgress(false);
                console.log("Error fun err first api call",err)
            });
        }
    };

    listAgendamento = async (data, token, emitente, start,max,coluna,valor, sortColumnIndex, sortDirection) => {
        console.log("data",data)
        console.log("token",token)
        console.log("emitente",emitente)
        console.log("start",start)
        console.log("max",max)

        if(start === undefined){
            start = 0;
        }
        // if(!start||start==null){
        //     start=0;
        // }
        // if(!max||max==null){
        //     start=0;
        // }
        // console.log("start",start)
        // var filtros = [{"coluna":coluna,"valor":valor}];
        // if(typeof(coluna)=='undefined') filtros=[];

        var obj={"id":data.id ? data.id : 0 ,"secho":"","startRow":start === -10 ? 0 : start,"maxResults":10,"filtros":[],"programa":"ORD600"}
        if(data){
            await api.post("/sinwcad/mobile/consulta/loadDataAjaxJson.do",obj,{headers:{'emitente':emitente,'token':token}}).then(res =>{
                if(res){
                    // return res.data;
                    console.log("ressssssssssss",res.data)
                    if(res.data){
                        setUserdata(res.data.aaData)
                        unseletbtn();
                        setProgress(false);
                    }
                    // listAgendamento(res.data)
                } else{
                    // return res;
                    setProgress(false);
                    console.log("Error first api call")
                }
            },function(err){
                // this.finaliza(err);
                // return err;
                setProgress(false);
                console.log("Error fun err first api call")
            });
        }

    }
 
    async function handleSubmit() {
        AsyncStorage.setItem('serverURL', serverURL);
        AsyncStorage.setItem('chaveLogo', chaveLogo);
        await ConfigurationApi.setBaseURL();
        this.notification.alertWithType('success', 'Notificação', 'Configurações Salvas com Sucesso!');
    }

    onBackclick = () => {
        console.log("onBackclick selected")
        navigation.navigate('SincDashboard')
    }

    onselectButton = (id,item) => {
        SelectedBox();
        SelectedBox(id);
        setTickbtn(false);
        var dateformat = item[4].split('/');
        var orgDate = dateformat[2]+"-"+ dateformat[1]+"-"+ dateformat[0] +"T"+ item[5] +':00.001-0300';
        setSelectDate(orgDate);
        setSelectData(item)
    }

    unseletbtn = (id) => {
        setProgress(true)
        setMessage('carregando...')
        SelectedBox();
        setTickbtn(true);
        setProgress(false)
    }

    nextbtn = async () => {
        setCount(count + 10)
        var start = count + 10;
        if (netInfo.isConnected == true) {
            const token = await AsyncStorage.getItem('token');
            const emitente = await AsyncStorage.getItem('codigoEmitente');
            setProgress(true);
            listAgendamento(userId, token, emitente, start, 10)
            setPrevbtn(false)
        } else{
            setProgress(false);
        }
    };

    prevbtn = async () => {
        setCount(count - 10)
        if (netInfo.isConnected == true && count >= 0) {
            setProgress(true);
            const token = await AsyncStorage.getItem('token');
            const emitente = await AsyncStorage.getItem('codigoEmitente');
            listAgendamento(userId, token, emitente, count,10)
        } else{
            setPrevbtn(true)
            setProgress(false);
        }
    };

    tickclick = async () => {
        AsyncStorage.setItem('selectAgendamentos', JSON.stringify(setselectdata),() =>{
            // AsyncStorage.getItem('selectAgendamentos',(err,res) =>{
            //     console.log("resu",res)
               
            // })
            SelectedBox();
            setTickbtn(true);
        });
        Alert.alert(
            'sucesso',
            "Agendamendo ja foi recepcionado.",
        );
    };

    cancelSchedule = async () => {
        setProgress(true);
        setMessage('agendar cancelamento ...');
        var dateobj = new Date();
        var orgdate = dateobj.toISOString();
        const token = await AsyncStorage.getItem('token');
        const emitente = await AsyncStorage.getItem('codigoEmitente');
        const emitentFull = JSON.parse(await AsyncStorage.getItem('emitentFull'));
        var obj = {
            "token": token,
            "date": setdate,
            "dealer": emitentFull.cnpj,
            "attendant_id": setselectdata[20],
        };
        console.log("obj",obj)
        if (netInfo.isConnected == true) {          
            if(token !== null && emitentFull.cnpj !== null)  {
                await api.post('/ord/ws/agenda/cancelarAgenda',obj).then(res =>{
                    if(res){
                        console.log("ressssssssssss",res.data.code)
                        if(res.data.code ==='OK'){
                            console.log("count",count)

                            setProgress(true);
                            setMessage('carregando...')
                            listAgendamento(userId, token, emitente, count,10)
                        }
                        setProgress(false);
                    } else{
                        setProgress(false);
                    }
                },function(err){
                    setProgress(false);
                });
                setProgress(false);  
            } else {
                setProgress(false);  
            }     
        } else {
            setProgress(false);
            console.log('no iinter')
        }
    }

    return (
        <>
         {/* <SafeAreaView style={{backgroundColor:"#cacaca"}}> */}
            <View  style={styles.flatMainContainter} >
                <View style={styles.headerBox}>   
                    {/* <TouchableOpacity onPress={() => onBackclick()} style={{ margin:5 }} >                           
                        <View style = {{}}>
                            <Text style={styles.backButton}>Back</Text>
                       </View>
                    </TouchableOpacity>  */}
                    <View style = {styles.headerText}>
                        <Text style={styles.headertextContent}>Agendamentos</Text>
                    </View>
                </View>     
                
                <View style={styles.flatTopBox}>
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 0 }}
                    data={Userdata}
                    renderItem={({ item, index }) => (
                    <View style={[styles.flatListContainer,{backgroundColor: index === seletedbox ? primaryColor : '#fff'}]}>
                        <TouchableOpacity onPress= {() => onselectButton(index, item)}>
                        <View style={styles.flatContent}>
                            <View style={styles.contentBox}>
                                <Text style={styles.headingText}>IDENTIFICACAO</Text>
                                <Text></Text>
                                <Text style={styles.contentText}>{item[0]}</Text>
                            </View>
                            <View style={styles.contentBox}>
                                <Text style={styles.headingText}>PLACA VEICILO</Text>
                                <Text style={styles.headingText}></Text>
                                <Text style={styles.contentText}>{item[2]}</Text>
                            </View>
                            <View style={styles.contentBox}>
                                <Text style={styles.headingText}>DATA</Text>
                                <Text style={styles.headingText}>AGENDAMENTO</Text>
                                 <Text style={styles.contentText}>{item[4]}</Text>
                            </View>
                        </View>
                        <View style={styles.flatContent}>
                            <View style={styles.contentBox}>
                                <Text style={styles.headingText}>HORA</Text>
                                <Text style={styles.headingText}>AGENDAMENTO</Text>
                                <Text style={styles.contentText}>{item[5]}</Text>
                            </View>
                            <View style={styles.contentBox}>
                                <Text style={styles.headingText}>COD. MOD.</Text>
                                <Text style={styles.headingText}>VEICILO</Text>
                                <Text style={styles.contentText}>{item[6]}</Text>
                            </View>
                            <View style={styles.contentBox}>
                                <Text style={styles.headingText}>MODELO</Text>
                                <Text style={styles.headingText}>VEICILO</Text>                                
                                <Text style={styles.contentText}>{item[7]}</Text>
                            </View>
                        </View>
                        <View style={styles.flatContent}>
                            <View style={styles.contentBox}>
                                <Text style={styles.headingText}>PASSANTE</Text>
                            <Text style={styles.headingText}></Text>
                                <Text style={styles.contentText}>{item[8]}</Text>
                            </View>
                            <View style={styles.contentBox}>
                                <Text style={styles.headingText}>CLIENTE</Text>
                            <Text style={styles.headingText}></Text>
                                <Text style={{flex: 0.5, flexWrap: 'wrap',fontSize:10}}>{item[9]}</Text>
                            </View>
                            <View style={styles.contentBox}>
                                <Text style={styles.headingText}>TELEFONE</Text>
                            <Text style={styles.headingText}></Text>
                                <Text style={styles.contentText}>{item[11]}</Text>
                            </View>
                        </View>
                        <View style={styles.flatContent}>
                            <View style={styles.contentBox}>
                                <Text style={styles.headingText}>DDD</Text>
                            <Text style={styles.headingText}></Text>
                                <Text style={styles.contentText}>{item[12]}</Text>
                            </View>
                            <View style={styles.contentBox}>
                                <Text style={styles.headingText}>CELULAR</Text>
                            <Text style={styles.headingText}></Text>
                                <Text style={styles.contentText}>{item[13]}</Text>
                            </View>
                            <View style={styles.contentBox}>
                                <Text style={styles.headingText}>NRO. OS</Text>
                            <Text style={styles.headingText}></Text>
                                <Text style={styles.contentText}>{item[18]}</Text>
                            </View>
                        </View>
                        <View style={{flexDirection:'row',padding:1,}}>
                            <View style={{ flex:1, flexDirection:'column',alignItems:'center' }}>
                                <Text style={{ fontSize: 10,fontWeight:'bold', color:'#000'}}>RECLAMACAO</Text>
                                <Text style={styles.headingText}></Text>
                                <Text style={styles.contentText}>{item[19]}</Text>
                            </View>
                        </View>
                        <View style={{flexDirection:'row',padding:1,}}>
                            <View style={styles.contentBoxEnd}>
                                <Text style={styles.headingText}>NRO. ORC {item[22]}</Text>
                            </View>
                        </View>
                        </TouchableOpacity>
                    </View>        
                    )}
                    keyExtractor={(item, index) => index.toString()}
                    />               
                </View>
                <View style={{height:40, paddingBottom:5,justifyContent:'space-evenly', backgroundColor:'#00000000', flexDirection:"row", alignItems:'center',}}>   
                    <TouchableOpacity disabled={prevbtnenab} onPress={() => prevbtn()} style={{ margin:5 }} >                           
                        <View style = {{borderWidth: 1, padding:5, borderColor: '#cacaca', borderRadius: 10,  justifyContent:'center',backgroundColor: prevbtnenab ? '#cacaca' : primaryColor}}>
                            <Text style={styles.backButton}>{'< <'}</Text>
                        </View>
                    </TouchableOpacity> 
                    <View style={{flexDirection:'row'}}>
                        <TouchableOpacity disabled={tickenab} onPress={() => tickclick()} style={{ margin:5 }} >                           
                            <View style = {{borderWidth: 1, padding:5, borderColor: '#cacaca', borderRadius: 10,  justifyContent:'center',backgroundColor:tickenab ? '#cacaca' : primaryColor}}>
                                <Text style={styles.backButton}>{'V'}</Text>
                            </View>
                        </TouchableOpacity> 
                        <TouchableOpacity onPress={() => unseletbtn(seletedbox)} style={{ margin:5 }} >                           
                            <View style = {{borderWidth: 1, padding:5, borderColor: '#cacaca', borderRadius: 10,  justifyContent:'center',backgroundColor:primaryColor}}>
                                <Text style={styles.backButton}>unse</Text>
                            </View>
                        </TouchableOpacity> 
                        <TouchableOpacity onPress={() => cancelSchedule()} style={{ margin:5 }} >                           
                            <View style = {{borderWidth: 1, padding:5, borderColor: '#cacaca', borderRadius: 10,  justifyContent:'center', backgroundColor:primaryColor}}>
                                <Text style={styles.backButton}>{' X '}</Text>
                            </View>
                        </TouchableOpacity> 
                    </View>
                    <TouchableOpacity onPress={() => nextbtn()} style={{ margin:5 }} >                           
                        <View style = {{borderWidth: 1, padding:5, borderColor: '#cacaca', borderRadius: 10,  justifyContent:'center', backgroundColor:primaryColor}}>
                            <Text style={styles.backButton}>{'> >'}</Text>
                        </View>
                    </TouchableOpacity> 
                </View>  
            </View>
            <SincProgress visible={progress} title={title} message={message} />
            {/* </SafeAreaView> */}
        </>
    );
}