import { defaultStyles, primaryColor, successColor, errorColor, warningColor, infoColor, whiteColor, darkColor, selectedPrimaryColor } from '../../../../defaultStyles';
import { Button, Input } from 'react-native-elements';
import React, { useState, useEffect, useRef } from 'react';
import { View, KeyboardAvoidingView,Slider, Platform, Text, Modal, StatusBar, Dimensions, SafeAreaView, Picker, StyleSheet, FlatList, ActivityIndicator, Image, TouchableHighlight, TouchableOpacity,TextInput, BackHandler,ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNetInfo } from "@react-native-community/netinfo";
import { styles } from '../../Agendamentos/styles';
import EditText from '../../../../../components/EditText'
import RBSheet from 'react-native-raw-bottom-sheet';
import SincProgress from '../../../../../components/SincProgress';
import api from '../../../../../services/api';
import Carousel from 'react-native-snap-carousel';
const defectDetails=[
    {id:0,key:'M',value:'MANCHADO'},
    {id:1,key:'D',value:'DSCASCADO'},
    {id:2,key:'Q',value:'MANCHADO'},
    {id:3,key:'R',value:'MANCHADO'},
    {id:4,key:'A',value:'MANCHADO'},
    {id:5,key:'T',value:'MANCHADO'},
    {id:6,key:'L',value:'MANCHADO'},
    {id:7,key:'C',value:'MANCHADO'},
    {id:8,key:'E',value:'MANCHADO'},
    {id:9,key:'P',value:'MANCHADO'},
    {id:10,key:'P',value:'MANCHADO'},
]
const ButtonDetails=[
    {id:0,image:require('../../../../../assets/undo.png'),backgroundColor:primaryColor},
    {id:1,image:require('../../../../../assets/save.png'),backgroundColor:primaryColor},
    {id:2,image:require('../../../../../assets/edit.png'),backgroundColor:primaryColor},
]
const Step4=()=>  {
    const [getPlaca, setPlacamsg] = useState('');
    const RBShee = useRef();
    const [TextArray,setTextArray]=useState([])
    const [isEnable,setisEnable]=useState(false);
    const [IndexKey,setketTouchIndex]=useState('');
    const [selectedText,setselectedText]=useState('');
    const [imageList,setImageList]=useState([]);
    const [getPlacaModel, setPlacaModel] = useState('');
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');

    const [getDefectDetails,setDefectDetails]=useState()
    const [progress, setProgress] = useState(false);
    useEffect(() => {
       
        getPalcadata();
        
    }, []);


    const getbuscarImagensModelo= async (modelo)=>{
        setTitle('Aguarde');
      setMessage('Carregando imagens...');
        setProgress(true);
        let token = await AsyncStorage.getItem('token');
        const checkId = await AsyncStorage.getItem('checkId');
        const emitente = await AsyncStorage.getItem('emitente')
        const emitenteCode = await AsyncStorage.getItem('codigoEmitente');
        modelo='BZ2'
        console.log("getPlacaModel",modelo)
        api.get(`/ord/ws/checklist/buscarImagensModelo?token=${token}&emitente=${emitenteCode}&modelo=${modelo}`).then(resp => {
          setProgress(false);
            const data = resp.data;
            if(resp.data.sucesso){
                let finalArray=[]
                let imageObjectKey={
                    imagemDireita:'imagemDireita',
                    imagemEsquerda:'imagemEsquerda',
                    imagemFrontal:'imagemFrontal',
                    imagemTraseira:'imagemTraseira'
                }
                let imagearray=Object.keys(data)
                imagearray.map((item,index)=>{
                  if(imageObjectKey[item]===item){      
                      finalArray.push(data[imageObjectKey[item]])
                  }
                })
                setImageList(finalArray)
                console.log('ImageData----response',finalArray)
            }else{
                
            }
            
        }).catch(ex => {
            console.log('ex',ex)
            // if (ex.response.status === 404) {
            //     setProgress(false);
               
            // } else {
            //     setProgress(false);
               
            // }
        });
    }
  const  getPalcadata = async () => {
        const placadata = JSON.parse(await AsyncStorage.getItem('selectAgendamentos'));            
            if(placadata !== null){
                setPlacaModel(placadata[6] !== null ? placadata[6] : '')
                setPlacamsg(placadata[2] !== null ? placadata[2] : '')
                
            }

            getbuscarImagensModelo(placadata[6])
    }

    const KeyTouch=(item,index)=>{
        setselectedText(item.key)
        setisEnable(true);
       setketTouchIndex(index)
      
    }
    const DefectRender=({item,index})=>{
        return(
            <View style={Styles.DefectList}>
                 <Text >{item.key}:{item.value}</Text>
            </View>
        )
    }
    const _renderItem =({item,index})=>{
       
        return(
            <View>
 <Image  style={Styles.image} source={{uri:`data:image/gif;base64,${item}`}}></Image>
            </View>
        )
    }
    const buttonAction=(item,index)=>{
        if(item.id===0){
            let TextLocal=TextArray;
            TextLocal.splice(-1,1)
            setTextArray([...TextLocal])
        }
        else if(item.id==2){
            RBShee.current.open();        
        }
        else{
            setTextArray([...[]])
        }
    }
    const DefectKeyRender=({item,index})=>{
        return(
            <TouchableOpacity onPress={()=>KeyTouch(item,index)}>
            <View style={IndexKey===index?Styles.SelectedDefectKeyRender:Styles.DefectKeyRender}>
                 <Text style={IndexKey===index?Styles.SelectedtexRendere:Styles.texRendere}>{item.key}</Text>
            </View>
            </TouchableOpacity>
        )
    }
    const setTextPosition=(e)=>{
        if(isEnable){
            const l= Math.round(e.nativeEvent.locationX);
            const t= Math.round(e.nativeEvent.locationY);
            let selectedObj={
                selectedText:selectedText,
                left:l,
                top:t            
            }
            let Textarraylocal=TextArray;
            Textarraylocal.push(selectedObj);
            setTextArray([...Textarraylocal])
        }
    }
    const closed=()=>{
        RBShee.current.close();
    }
    const ButtonRender=({item,index})=>{
        return(
            <TouchableOpacity onPress={()=>buttonAction(item,index)}>
            <View style={Styles.ButtonRender}>
                 <Image style={{tintColor:'#fff',width:30,height:30}} source={item.image} ></Image>
            </View>
            </TouchableOpacity>
        )
    }
  
        return(
            <View style={Styles.mainContainer}>
            <ScrollView showsVerticalScrollIndicator={false} >
            <SincProgress visible={progress} title={title} message={message} />
            {getPlaca !== '' ?
                    <View style={{alignItems:'center',backgroundColor:'#cacaca',padding:10,borderRadius:10,marginTop:10,marginHorizontal:20}}>
                        <Text>Placa: {getPlaca}</Text>
                    </View> : null
                }
                <View style={Styles.Defects}>
                <FlatList
                    data={defectDetails}
                    numColumns={3}                   
                    showsHorizontalScrollIndicator={false}
                    renderItem={DefectRender}></FlatList>    
                      <FlatList
                    data={defectDetails}
                  horizontal={true}            
                    showsHorizontalScrollIndicator={false}
                    renderItem={DefectKeyRender}></FlatList>               
                </View>
                <View  onTouchStart={(e) => {setTextPosition(e)}} style={Styles.BackgroundImageContainer}>
                                    <Carousel            
              data={imageList}
              renderItem={_renderItem}
              sliderWidth={windowWidth}
              itemWidth={windowWidth}
            />
               
           {TextArray.length>0?   
           TextArray.map((item,index)=>{
               return(
                <View style={{position:'absolute',left:item.left,top:item.top,  height:30,width:35,
                backgroundColor:'#fff',
                borderRadius:3,
                borderColor:'#000' ,
                marginLeft:8,
                justifyContent:'center',
                alignItems:'center',}}>
                                 <Text>{item.selectedText}</Text>
                                 </View>
               )
           })
        
                        :null}
                   
    
                </View> 
                <View style={Styles.buttonStyle}>
                <FlatList
                    data={ButtonDetails}
                     horizontal={true}            
                    showsHorizontalScrollIndicator={false}
                    renderItem={ButtonRender}></FlatList>       
                    </View>  
                             
            </ScrollView>
            <RBSheet
              ref={RBShee}
              height={400}
              duration={400}
              closeOnDragDown={true}
              closeOnPressMask={true}
              customStyles={{
                container: {
                  borderTopRightRadius: 25,
                  borderTopLeftRadius: 25,
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                },
              }}>
               <EditText close={()=>closed()}/>
            </RBSheet>
        </View>
        )
    } 
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const Styles = StyleSheet.create({
    mainContainer: {
        paddingHorizontal:20,
        paddingVertical:10,
        height: windowHeight-100
    },
    Defects:{
    marginTop:20,
    borderRadius:5,
    width:400,
    height:150,
    backgroundColor:'#cacaca'
    },
    DefectList:{
        justifyContent:'center',
        alignItems:'center',
        padding:3,
        marginLeft:5
    },
    DefectKeyRender:{
       width:22,
       height:30,
       backgroundColor:'#fff',
       borderRadius:3,
       borderColor:'#000' ,
       marginLeft:6.5,
       justifyContent:'center',
       alignItems:'center',
    },
    BackgroundImageContainer:{  
   flex:1,
   position:'relative'
    },
    image: {
        width:350,
        height:300, 
        resizeMode: 'contain',
        transform: [{ rotate: '360deg' }]
      },
      buttonStyle:{
          alignItems:'center',justifyContent:'center'
      },
      ButtonRender:{
        width:90,
        height:60, 
        marginLeft:10,
        backgroundColor:primaryColor,
        borderRadius:5,
        justifyContent:'center',
        alignItems:'center',
      },
      SelectedDefectKeyRender:{
        width:22,
        height:30,
        backgroundColor:primaryColor,
        borderRadius:3,
        borderColor:'#000' ,
        marginLeft:8,
        justifyContent:'center',
        alignItems:'center',
      },
      texRendere:{
          color:'#000'
      },
      SelectedtexRendere:{
        color:'#fff'
    }
});
export default Step4;
