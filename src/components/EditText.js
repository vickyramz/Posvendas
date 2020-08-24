
import React, { useState, useEffect, useRef } from 'react';
import { View,TextInput,Dimensions,StyleSheet,TouchableOpacity ,Text} from 'react-native';
import { defaultStyles, primaryColor, successColor, errorColor, warningColor, infoColor, whiteColor, darkColor, selectedPrimaryColor } from '../screens/defaultStyles';
const EditText =(props)=>{
    const [edit,setedit]=useState('');
    const onChangeText=(text)=>{
        setedit(text)
    }  
        return(
          <View style={{flex:1}}>
              <View style={{flex:0.9}}>
              <TextInput
                numberOfLines={3}
      style={{ height: 40, borderWidth:0,borderBottomColor: 'gray', borderBottomWidth: 1 }}
      placeholder={'please enter description'}
      onChangeText={text => onChangeText(text)}
      value={edit}
    />   
              </View>
              
   <View style={{flex:0.1,flexDirection:'row',}}>
   
    <TouchableOpacity onPress={()=>props.close()} style={{height:50,width:windowWidth/2}}>
            <View style={{backgroundColor:primaryColor,height:50,justifyContent:'center',alignItems:'center'}}>
            <Text style={{color:'#fff'}}>{'Done'}</Text>
            </View>
        </TouchableOpacity>  
        <TouchableOpacity style={{height:50,width:windowWidth/2,paddingLeft:1,marginRight:1}}>
            <View style={{backgroundColor:'#fff',height:50,justifyContent:'center',alignItems:'center',borderColor:'gray',borderWidth:0.5}}>
            <Text style={{color:'#000'}}>{'Cancelo'}</Text>
            </View>
        </TouchableOpacity>  
    </View>
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

});
export default EditText;
