import { StyleSheet, Dimensions } from 'react-native';
import { darkColor, primaryColor, whiteColor } from '../../../defaultStyles';
// const winHeight = Dimensions.get(window);
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({

    containerConfig: {
        flex: 1,
        flexDirection: "row",
        alignItems: "flex-start",
        backgroundColor: whiteColor
    },
    containerConfigForm: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        backgroundColor: whiteColor,
        marginBottom: 20,
        zIndex: 0
    },

    flatMainContainer :{
        flex:1
    },

    headerBox: {
        height:40, 
        backgroundColor:primaryColor,
        flexDirection:"row",
        alignItems:'center',
        justifyContent:'center',
    },
    
    flatListContainer: {  
        borderWidth: 1,
        paddingTop: 3,
        borderColor: '#cacaca',
        borderRadius: 10,
        paddingBottom:15,
        justifyContent:'center'
    },

    flatContent: {
        flexDirection:'row', 
        justifyContent:'space-evenly',
        padding:1
    },

    contentBox: {
        flexDirection:'column',
        alignItems:'center',
        flex:1,
    },

    contentBoxEnd: {
        flexDirection:'column',
        alignItems:'flex-start',
        paddingLeft: 20,
    },

    headingText: {
        fontSize: 10,
        fontWeight:'bold',
        color:'#000'
    },

    backButton: { 
        color:'#fff'
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
    flatTopBox: { 
        padding:10,
        paddingHorizontal:20,
        backgroundColor:'#fff',
        height: windowHeight-100,
    },

    contentText: {
        fontSize: 10, 
        color:'#000'
    },

    buttonConfig: {
        backgroundColor: primaryColor,
        borderRadius: 10,
        borderColor: primaryColor,
        borderWidth: 1
    },

    inputConfig: {
        height: 40,
        width: 200,
        padding: 5,
        fontSize: 16,
        borderRadius: 10,
        color: darkColor
    },

    buttonGroup: {
        height: 50, 
        justifyContent: 'flex-end',
        marginRight: 17,
        marginLeft: 17,
        marginTop: 15,
    },

    titleButton: {
        color: whiteColor,
        fontWeight: 'bold'
    },

    buttonConfig: {
        backgroundColor: primaryColor,
        borderRadius: 10,
        borderColor: primaryColor,
        borderWidth: 1,
    },

    buttonText: {
        color: whiteColor,
        fontWeight: 'bold',
        fontSize: 16,
    },
    logo: {
        // marginBottom: 20, 
        width: 40, 
        height: 40
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
});