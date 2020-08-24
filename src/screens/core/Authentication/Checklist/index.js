import { defaultStyles, primaryColor, successColor, errorColor, warningColor, infoColor, whiteColor, darkColor, selectedPrimaryColor } from '../../../../screens/defaultStyles';
import { Button, Input } from 'react-native-elements';
import React, { useRef, useState, useEffect } from 'react';
import { View, KeyboardAvoidingView,Slider, Platform, Text, Modal, StatusBar, Dimensions, SafeAreaView, Picker, StyleSheet, FlatList, ActivityIndicator, Image, TouchableHighlight, TouchableOpacity,TextInput, BackHandler,Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import { ScrollView } from 'react-native-gesture-handler';
import SincEmitenteTop from '../../../../components/SincEmitenteTop.js';
import { isEmpty } from '../../../../utils/SincCompare.js';
import { menuChecklistConstant } from '../../../../components/core/menuConstant';
import logo from '../../../../assets/settings.png';
import SincProgress from '../../../../components/SincProgress.js';
import ConfigurationApi from '../../../../services/ConfigurationApi';
import IconFive from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/FontAwesome';
import DropdownAlert from 'react-native-dropdownalert';
import api from '../../../../services/api';
import { useNetInfo } from "@react-native-community/netinfo";
import Camera from '../../../../common/camera';
import Step1 from './Step1/';
import Step2 from './Step2/'
import Step3 from './Step3'
import Step4 from './step4'
// import Slider from '@react-native-community/slider'
import Wizard from "react-native-wizard"
  
const CheckList = ({ navigation, props }) => {
    const netInfo = useNetInfo();
    const [progress, setProgress] = useState(false);
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('carregando...');
    const [dropdownview, SetDropdownView] = useState(false);
    const [steps, SetSteps] = useState(false);
    const [step1, SetSteps1] = useState(false);
    const [step2, SetSteps2] = useState(false);
    // const [currentStep, setCurrentStep] = useState('');
    const [selectedValue, setSelectedValue] = useState("");
    const [dropdownlist, setDropdownList] = useState([]); 
    const [getPlaca, setPlacamsg] = useState('');
    const [img, setImg] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalType, setmodalType] = useState("camera");
    const [step1Data, setStep1Data] = useState([]);
    var arr = [];

    const [Combustivel, setCombustivel]= useState('')
    const [Conductor, setConductor]= useState('')
    const [Odometro, setOdometro]= useState('')
    const [CombustivelMtr, setCombustivelMtr]= useState('VAZIO')

    
    onChange = (name,value) => {
        console.log(name)
        console.log(value)
    }
    useEffect(() => {
        getPalcadata();
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
       
    getPalcadata = async () => {
        const placadata = JSON.parse(await AsyncStorage.getItem('selectAgendamentos'));
        if(placadata !== null){
            console.log("placadata",placadata)
            console.log("placadata",placadata[2])
            setPlacamsg(placadata[2] !== null ? placadata[2] : '')
        }
    }

    onPicture = ({uri}) => {
        var arr = []
        arr = img
        arr.push(uri);
        setImg(arr);
    }
    
    onBackToCamera = () => {
        setImg(null);
      }

    dropDownApiCall = async () => {
        setProgress(true);
        if (netInfo.isConnected == true) {
            const token = await AsyncStorage.getItem('token');
            console.log("Token",token)
            await api.get(`/ord/ws/checklist/buscarChecklist?token=${token}`).then(res =>{
                if(res.data){
                    setProgress(false);
                    setDropdownList(res.data)
                    console.log("Response",res.data)
                } else{
                    setProgress(false);
                    console.log("Error first api call")
                }
            },function(err){
                setProgress(false);
                console.log("Error fun err first api call",err)
            });
        }
    }

    menuselected = (id, name) => {
        if(id === 1){
            SetDropdownView(true);
            dropDownApiCall();
        }else if(id ===2){
            navigation.navigate('Camera')
        }
    }

    onSelectCheckbox = async () => {
        console.log("selectedValue",selectedValue);
        if (netInfo.isConnected == true) {
            setProgress(true);
            setMessage('carregando...');
            const token = await AsyncStorage.getItem('token');
            const placadata = JSON.parse(await AsyncStorage.getItem('selectAgendamentos'));
            console.log("Token",token)            
            if(token !== null && placadata !== null){
                console.log("placadata",placadata)
                console.log("placadata",placadata[2])
                await api.get(`/ord/ws/checklist/buscarPorPlaca?token=${token}&placa=${placadata[2]}`).then(res =>{
                    if(res){
                        SetSteps(true);
                        SetSteps1(true);
                        setCurrentStep('step1')
                        console.log("Response",res.data)
                        if(res.data){
                            setStep1Data(res.data)
                        }
                        setProgress(false);

                    } else{
                        // setTimeout(async () => {
                        //     setProgress(true);
                            setMessage('selecto Placa...');          
                        // }, 500);                       
                        setProgress(false);
                        console.log("Error first api call")
                    }
                },function(err){
                    setProgress(false);
                    Alert.alert(
                    'Error',
                    "Please choose another PLACA",
                    );
                    console.log("Error fun err first api call",err)
                });
            } else{
                Alert.alert(
                'Error',
                "Selecione Placa...",
                );
                setProgress(false);
            }
        }
    }
    onBackclick = () => {
        console.log("onBackclick selected")
        navigation.navigate('SincDashboard')
    }

    cameraClose = () => {
        setModalVisible(!modalVisible);
    }

    defalutvalChange = (uri) => {
       console.log("urrrrrrrr",uri)
       SetSteps1(uri)
    }

    onNextPress = (currentStep) => {
        if(currentStep === 'step1'){
            SetSteps(true);
            SetSteps1(false);
            SetSteps2(true)
            setCurrentStep("step2")
        }
    }
   nextStep=()=>{
    // if(currentStep === 'step3'){

    // }
    wizard.current.next()
   }
    distanceMeter = (meter) => {
        console.log("meeter",meter)
        //1/4 MEIO 3/4 CHEIO
        if(meter <= 20){
            setCombustivelMtr("VAZIO")
        }else if(meter >= 20 &&  meter <= 40){
            setCombustivelMtr("1/4")
        setCombustivelMtr("1/4")
        }else if(meter >= 40 &&  meter <= 60){
            setCombustivelMtr("MEIO")
        }else if(meter >= 60 &&  meter <= 80){
            setCombustivelMtr("3/4")
        }else if(meter > 80){
            setCombustivelMtr("CHEIO") 
        }
    }

    const wizard = useRef()
  const [isFirstStep, setIsFirstStep] = useState(true)
  const [isLastStep, setIsLastStep] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
//   const stepList = [
//     {
//       content: <Step1 defaultParams ={step1Data}  defalutvalChange={defalutvalChange}  style={{ width: 100, height: 100, backgroundColor: "#000" }} />,
//     },
//     {
//       content:  <Step1 defaultParams ={step1Data}  defalutvalChange={defalutvalChange}  style={{ width: 100, height: 100, backgroundColor: "#000" }} />,
//     },
//   ]

const stepList = [
    {
      content: <Step1 defaultParams ={step1Data}  defalutvalChange={defalutvalChange} style={{ width: 100, height: 100, backgroundColor: "#000" }} />,
    },
    {
      content: <Step2 style={{ width: 100, height: 100, backgroundColor: "#e04851" }} />,
    },
    {
        content: <Step3 style={{ width: 100, height: 100, backgroundColor: "#e04851" }} />,
      },
      {
        content: <Step4 style={{ width: 100, height: 100, backgroundColor: "#e04851" }} />,
      },
  ]
 

    return (
        <>
            <SafeAreaView>
                <Modal visible={modalVisible} >
                    { modalType === 'camera' ?
                        <Camera onPicture={onPicture} cameraClose={cameraClose} />:
                            <View style={{height: windowHeight-50, marginHorizontal: 25}}>
                                <FlatList data={img}
                                    renderItem={({ item }) => (                                                       
                                        <View style={styles.imageContainer}>
                                            <View style={styles.imageItem}>
                                                <Image source={{uri: item}} style={styles.cameralogo} resizeMode={'contain'} />
                                            </View>
                                        </View>
                                    )}
                                    numColumns={3}  keyExtractor={(item, index) => index.toString()}
                                />           
                                <View style={{alignItems:'center'}} >             
                        <TouchableHighlight  style={{ ...styles.openButton, backgroundColor: "#2196F3",}}
                        onPress={() => {setModalVisible(!modalVisible);}}>
                            <Text style={styles.textStyle}>Fechar</Text>
                        </TouchableHighlight></View>
                    </View>
                    }
                </Modal>
                <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
                <View style={styles.headerBox}>   
                    {/* <TouchableOpacity onPress={() => onBackclick()} style={{ margin:5 }} >                           
                        <View style = {{}}>
                            <Text style={styles.backButton}>Back</Text>
                        </View>
                    </TouchableOpacity> */}
                    <View style = {styles.headerText}>
                        <Text style={styles.headertextContent}>Checklist</Text>
                    </View>
                </View>   
                {getPlaca !== '' &&  !dropdownview && !steps  ?
                    <View style={{alignItems:'center',backgroundColor:'#cacaca',padding:10,borderRadius:10,marginTop:10,marginHorizontal:20}}>
                        <Text>Placa: {getPlaca}</Text>
                    </View> : null
                }
                { !dropdownview && !steps ?             
                <View style={styles.MainContainer}>
                    <FlatList
                    data={menuChecklistConstant}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => menuselected(item.id, item.name)} style={[styles.boxContainer,{backgroundColor: item.bgcolour !== null ? item.bgcolour :'#cacaca' }]} >
                            <View style={{ }} >                            
                                <View style={styles.imageContainer}>
                                    <View style={styles.imageItem}>
                                    <Image style={styles.logo} resizeMode={'contain'} source={logo} />
                                    </View>
                                </View>
                                <View style = {styles.nameLabel}>
                                    <Text style={styles.itemText}>{item.name}</Text>
                                </View>
                            </View> 
                        </TouchableOpacity>
                    )}
                    numColumns={3}
                    keyExtractor={(item, index) => index.toString()}
                    />
                </View> : !steps &&
                    <View style={{}}>
                        <View style={styles.container}>
                            <Picker
                                selectedValue={selectedValue}
                                style={{ height: 50, width: windowWidth-40, }}
                                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}>
                                {dropdownlist.map((item, index) => {
                                    return (<Picker.Item label={item.description} value={item.description} key={index}/>) 
                                })}
                            </Picker>                        
                        </View>
                        <View style={{alignItems:'center'}}>
                            <TouchableOpacity onPress={() => onSelectCheckbox()} style={{backgroundColor: primaryColor,borderRadius: 10, width: windowWidth/3, }} >
                                <View style = {{ alignItems:'center', padding:10}}>
                                    <Text style={styles.itemText}>Proximo</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                }
        
                {steps && step1 ?
                <View>
                    <View style={{ flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                        <Wizard
                            ref={wizard}
                            steps={stepList}
                            isFirstStep={val => setIsFirstStep(val)}
                            isLastStep={val => setIsLastStep(val)}
                            onNext={() => {
                            console.log("Next Step Called")
                            }}
                            onPrev={() => {
                            console.log("Previous Step Called")
                            }}
                            currentStep={({ currentStep, isLastStep, isFirstStep }) => {
                            setCurrentStep(currentStep)
                            }}
                        />
                    </View>
                    <View style={{height:40, bottom:1,justifyContent:'space-evenly', backgroundColor:'#4c90d4', flexDirection:"row", alignItems:'center',}}>   
                        <View style = {{borderWidth: 1, padding:5, borderColor: '#cacaca', borderRadius: 5,  justifyContent:'center',backgroundColor: isFirstStep ? '#cacaca' : primaryColor}}>
                            <TouchableOpacity disabled={isFirstStep} title="Prev" onPress={() => wizard.current.prev()}><Text style={{fontSize:12,fontWeight: "bold", color:'#fff'}}>Anterior</Text></TouchableOpacity>
                        </View>  
                        <View style = {{borderWidth: 1, padding:5, borderColor: '#cacaca', borderRadius: 5,  justifyContent:'center',backgroundColor:primaryColor}}>
                            <TouchableOpacity  onPress={() => {setModalVisible(true);setmodalType("camera");}}><Icon 
                                    name="camera"
                                    size={18}
                                    color={whiteColor}
                                /></TouchableOpacity>
                        </View>   
                        <View style = {{borderWidth: 1, padding:5, borderColor: '#cacaca', borderRadius: 5,  justifyContent:'center',backgroundColor:primaryColor}}>
                            <TouchableOpacity onPress={() => {setModalVisible(true); setmodalType("gallery");}}><Icon
                                    name="image"
                                    size={18}
                                    color={whiteColor}
                                /></TouchableOpacity>
                        </View>   
                        <View style = {{borderWidth: 1, padding:5, borderColor: '#cacaca', borderRadius: 5,  justifyContent:'center',backgroundColor:primaryColor}}>
                            <TouchableOpacity disabled={isLastStep} title="Next" onPress={() =>nextStep()}><Text style={{fontSize:12,fontWeight: "bold", color:'#fff'}}>Proximo</Text></TouchableOpacity>
                        </View>                         
                    </View> 
                </View>: null
                }
                <SincProgress visible={progress} title={title} message={message} />                
            </SafeAreaView>
        </>
    );
}

export default CheckList;
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    logo: {
        // marginBottom: 20, 
        width: 40, 
        height: 40
    },
    cameralogo: {
        // marginBottom: 20, 
        width: windowWidth/4, 
        height: windowHeight/3,
        margin: 5,
    },
    container: {
        // flex: 1,
        width:windowWidth-20,
        marginTop: 15,
        marginVertical:20,
        borderRadius:10,
        alignSelf: "center",
        backgroundColor:'#cacaca'
    },
    containerLogo: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: whiteColor
    },

    descriptionSystem: {
        fontSize: 18,
        color: primaryColor,
        fontWeight: 'bold',
        fontStyle: 'italic'
    },

    boxContainer:{ 
        flex: 1, 
        flexDirection: 'column',
        borderRadius: 10, 
        margin: 1, 
        height:75, 
        width:50, 
    },

    MainContainer: {
        justifyContent: 'center',
        // flex: 1,
        margin: 30,
    },
    imageThumbnail: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 100,
    },
    itemText: {
        color: '#fff',
        fontSize: 12,
        // fontWeight: 'bold',
    },

    imageContainer: { 
        alignItems:'center',
    },
    
    imageItem: {
        paddingVertical:10
    },

    nameLabel: {
        alignItems:'center',
        paddingBottom:10
    },
    headerBox: {
        height:40, 
        backgroundColor:primaryColor,
        flexDirection:"row",
        alignItems:'center',
        justifyContent:'center',
    },
    headerText: {
        alignItems:'center',
        // paddingHorizontal:50,
        // paddingLeft:75
    },
    headertextContent: {
        fontSize: 18,
        color:'#fff'
    },

    buttonGroup: { 
        height: 50, 
        justifyContent: 'center', 
        flexDirection: 'row', 
        margin: 10, 
        marginTop: 25 
    },

    titleButton: { 
        color: whiteColor, 
        fontWeight: 'bold' 
    },

    button: {
        height: 40,
        width: 170,
        backgroundColor: primaryColor,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },

    buttonText: {
        color: whiteColor,
        fontWeight: 'bold',
        fontSize: 16,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 1
      },
      modalView: {
        backgroundColor: "white",
        borderRadius: 1,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
      },
      openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        width:windowWidth/3
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      }
});