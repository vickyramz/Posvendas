import { defaultStyles, primaryColor, successColor, errorColor, warningColor, infoColor, whiteColor, darkColor, selectedPrimaryColor } from '../../../../defaultStyles';
import { Button, Input } from 'react-native-elements';
import React, { useState, useEffect, Component } from 'react';
import { View, KeyboardAvoidingView,Slider, Platform, Text, Modal, StatusBar, Dimensions, SafeAreaView, Picker, StyleSheet, FlatList, ActivityIndicator, Image, TouchableHighlight, TouchableOpacity,TextInput, BackHandler,Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNetInfo } from "@react-native-community/netinfo";

class Step2 extends Component  {
    constructor(props) {
        super(props);
        this.state = {
            metroObj:{
                Odometro:'',
                Conductor:''
            },
            CombustivelMtr: 'VAZIO',
        };
    }
     
    onChange = (name,value) => {
        console.log(name)
        const {metroObj} = this.state;
        metroObj[name]=value
        this.setState({...metroObj})
    }

    distanceMeter = (meter) => {
        console.log("meeter",meter)
        if(meter <= 20){
            this.setState({CombustivelMtr: "VAZIO"});
        }else if(meter >= 20 &&  meter <= 40){
            this.setState({CombustivelMtr: "1/4"});
        }else if(meter >= 40 &&  meter <= 60){
            this.setState({CombustivelMtr: "MEIO"});
        }else if(meter >= 60 &&  meter <= 80){
            this.setState({CombustivelMtr: "3/4"});
        }else if(meter > 80){
            this.setState({CombustivelMtr: "CHEIO"});
        }
    }
    render() {
        const {metroObj,CombustivelMtr} = this.state;
        return(
            <View style={Styles.mainContainer}>
            <ScrollView showsVerticalScrollIndicator={false} >
                <KeyboardAvoidingView enabled={true} >
                    <View style={Styles.textBoxView}>
                        <Text > <Icon name="camera" size={12} color={primaryColor}/> ODOMETRO</Text>
                        <View style={Styles.inputBox}>
                            <TextInput placeholder='Odometro' placeholderTextColor="#cacaca"
                                style={Styles.textBox} keyboardType = {"numeric"}
                                onChangeText={text => this.onChange( "Odometro", text )}
                                value={metroObj.Odometro}/>
                        </View>
                    </View>
                    
                    <View style={Styles.textBoxView}>
                        <Text ><Icon name="camera" size={12} color={primaryColor} /> COMBUSTIVEL {CombustivelMtr}</Text>
                        <View style={Styles.sliderView}>
                        <View style={Styles.inputBoxSlider}>
                            <View style={Styles.markerMark}></View>
                            <View style={Styles.markerMark}></View>
                            <View style={Styles.markerMark}></View>
                            <View style={Styles.markerMark}></View>
                            <View style={Styles.markerMark}></View>
                        </View>
                            <Slider onValueChange={val => this.distanceMeter(val)} step={5} style={Styles.sliderRange} minimumValue={0} maximumValue={100} step={0.25}  minimumTrackTintColor="#307ecc" maximumTrackTintColor='#000000' />
                        </View>
                    </View>                              
                    <View style={Styles.textBoxView}>
                        <Text ><Icon name="camera" size={12} color={primaryColor}/> CONDUCTOR </Text>
                        <View style={Styles.inputBox}>
                            <TextInput placeholder='Conductor' placeholderTextColor="#cacaca"
                                style={Styles.textBox}
                                onChangeText={text => this.onChange("Conductor",text)}
                                value={metroObj.Conductor}
                            />
                        </View>
                    </View>                            
                </KeyboardAvoidingView>
            </ScrollView>
        </View>
        )
    } 
}
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const Styles = StyleSheet.create({
    mainContainer: {
        paddingHorizontal:20,
        paddingVertical:10,
        height: windowHeight-100
    },
    textBoxView: {
        alignItems:'center',
        paddingVertical:10
    },
    inputBox: {
        flexDirection:'row', 
        borderColor: '#cacaca', 
        borderWidth: 1,
        borderRadius:10
    },
    inputBoxSlider: {
        width:windowWidth-70, 
        paddingLeft:10,
        justifyContent:"space-between" ,
        flexDirection:'row',
        height:10,
    },
    markerMark: {
        width:2,
        height:10,
        backgroundColor:'#000'
    },
    sliderView: { 
        borderColor: '#cacaca', 
        borderWidth: 1,
        borderRadius:10
    },
    textBox: { 
        height: 40, 
        width:windowWidth-50,
    },    
    sliderRange: {
        width:windowWidth-50,
        height:30
    },
});
export default Step2;
