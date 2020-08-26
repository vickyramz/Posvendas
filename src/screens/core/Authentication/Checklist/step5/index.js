import { defaultStyles, primaryColor, successColor, errorColor, warningColor, infoColor, whiteColor, darkColor, selectedPrimaryColor } from '../../../../defaultStyles';
import { Button, Input } from 'react-native-elements';
import React, { useState, useEffect, useRef } from 'react';
import { View, KeyboardAvoidingView,Slider, Platform, Text, Modal, StatusBar, Dimensions, SafeAreaView, Picker, StyleSheet, FlatList, ActivityIndicator, Image, TouchableHighlight, TouchableOpacity,TextInput, BackHandler,ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import api from '../../../../../services/api';
import SincProgress from '../../../../../components/SincProgress';
import { useNetInfo } from "@react-native-community/netinfo";
import { styles } from '../../Agendamentos/styles';
import EditText from '../../../../../components/EditText'
import RBSheet from 'react-native-raw-bottom-sheet';
import { useSelector } from 'react-redux';

const Step5=(props)=>  {
  
    useEffect(() => {
      buscarChecklist()
    }, []);
        //Loading
        const [progress, setProgress] = useState(false);
        const [title, setTitle] = useState('');
        const [message, setMessage] = useState('');
       const [groupList,setgroupList]=useState([]);
    async function buscarChecklist() {
      setProgress(true);
      setTitle('Aguarde');
      setMessage('Carregando Perguntas...');

      let token = await AsyncStorage.getItem('token');
      const checkId = await AsyncStorage.getItem('checkId');
      api.get(`/ord/ws/checklist/buscarGrupoPerguntas?token=${token}&idChecklist=${checkId}`).then(resp => {
        setProgress(false);
          const data = resp.data;
          setgroupList(data.grupos)
           console.log('GroupListData----response',data)
      }).catch(ex => {
          if (ex.response.status === 404) {
              setProgress(false);
             
          } else {
              setProgress(false);
             
          }
      });
  }
  const AnswerTouch=(items,indexs,groupIndex)=>{
   var tempListGroup= groupList.map((groupitem,groupindexs)=>{
    var tempList=groupitem.perguntas;
     tempList=tempList.map((item,index)=>{
      if(index===groupIndex){
        item.answerSelected=items
      }
      return item;
    })
    return groupitem;
   })
  console.log('itemList',tempListGroup)
    setgroupList([...tempListGroup])
  }
  const QaComponent=({item,index})=>{
    let tempArray=[];
    tempArray.push(item.opcao1);
    tempArray.push(item.opcao2);

    return(
        <TouchableOpacity >
        <View style={{justifyContent:'center',alignItems:'center',marginTop:10,height:100,borderBottomColor:primaryColor,borderBottomWidth:0.5,width:windowWidth}}>
        <Text style={{textAlign:'center'}}>{item.descricao}</Text>
        <View style={{justifyContent:'center',alignItems:'center',marginTop:10,flexDirection:'row'}}>
          {tempArray.map((items,indexs)=>{
            return(
              <TouchableOpacity onPress={()=>AnswerTouch(items,indexs,index)}>
              <View style={{padding:15,backgroundColor: item.answerSelected===items?primaryColor:'#fff',borderColor:item.answerSelected===items?primaryColor:'#fff',borderWidth:0.5,}}>
              <Text style={{textAlign:'center'}}>{items}</Text>
              </View>
              </TouchableOpacity>
            )
          })}        
        </View>
        </View>
        </TouchableOpacity>
    )
}
        return(
            <View style={Styles.mainContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
            <SincProgress visible={progress} title={title} message={message} />
            {groupList.map((item,index)=>{
             
              return(
                <View>
                <Text style={{textAlign:'center',fontWeight:'bold',marginTop:10}}>{item.descricao}</Text>
                <FlatList
                data={item.perguntas}                
            
                renderItem={QaComponent}></FlatList> 
                </View>
              )
            })}
            <View>

            </View>
           
           </ScrollView>
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
        marginLeft:10
    },
    DefectKeyRender:{
       width:22,
       height:30,
       backgroundColor:'#fff',
       borderRadius:3,
       borderColor:'#000' ,
       marginLeft:8,
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
        width:100,
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
export default Step5;
