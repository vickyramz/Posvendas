import React from 'react';
import { darkGrayColor, primaryColor, successColor, errorColor } from '../screens/defaultStyles';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Button, Card } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function SincCard({ 
    titleCard, 
    titleNumberOfLinesCard, 
    featuredTitleCard, 
    featuredSubtitleCard, 
    imageCard, 
    imagePropsCard,
    contentBody,
    isBotaoEditar = false,
    fnBotaoEditar,
    isBotaoExcluir = false,
    fnBotaoExcluir,
    isBotaoImprimir = false,
    fnBotaoImprimir,
    titleButton,
}) {

    function botaoEditar() {
        return (
            <Button
                icon={
                    <Icon
                        name='pencil-alt'
                        color='#ffffff'
                        style={ titleButton != null && titleButton != '' ? { marginRight: 10 } : null }
                    />
                }
                buttonStyle={styles.botaoEditar}
                title={titleButton}
                onPress={fnBotaoEditar}
            />
        );
    }

    function botaoImprimir() {
        return (
            <Button
                icon={
                    <Icon
                        name='print'
                        color='#ffffff'
                    />
                }
                buttonStyle={styles.botaoImprimir}
                onPress={fnBotaoImprimir}
            />
        );
    }

    function botaoExcluir() {
        return (
            <Button
                icon={
                    <Icon
                        name='trash'
                        color='#ffffff'
                    />
                }
                buttonStyle={styles.botaoExcluir}
                onPress={fnBotaoExcluir}
            />
        );
    }

    return(
        <>
            <Card
                containerStyle={styles.containerStyle}
                dividerStyle={styles.dividerStyle}
                title={titleCard}
                titleNumberOfLines={titleNumberOfLinesCard}
                titleStyle={styles.titleStyle}
                featuredTitle={featuredTitleCard}
                featuredTitleStyle={styles.featuredTitleStyle}
                featuredSubtitle={featuredSubtitleCard}
                featuredSubtitleStyle={styles.featuredSubtitleStyle}
                image={imageCard}
                imageProps={imagePropsCard}
                imageStyle={styles.imageStyle}
                imageWrapperStyle={styles.imageWrapperStyle}
                wrapperStyle={styles.wrapperStyle}
            >
                <Text style={{ marginBottom: 10 }}>{contentBody}</Text>

                <View style={styles.containterButtons}>
                    { isBotaoEditar && botaoEditar() }
                    { isBotaoImprimir && botaoImprimir() }
                    { isBotaoExcluir && botaoExcluir() }
                </View>
            </Card>
        </>
    );
}

const screenWidth = Math.round(Dimensions.get('window').width);  

const styles = StyleSheet.create({
    containerStyle: {
        borderRadius: 10,
        borderColor: darkGrayColor
    },

    dividerStyle: {
        backgroundColor: darkGrayColor
    },

    titleStyle: {

    },

    featuredTitleStyle: {

    },

    featuredSubtitleStyle: {

    },

    imageStyle: {
        
    },

    imageWrapperStyle: {

    },

    wrapperStyle: {

    },

    containterButtons: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },  

    botaoEditar: {
        flex: 1,
        width: screenWidth * .56,
        height: 50,
        backgroundColor: primaryColor,
        borderWidth: 1,
        borderColor: primaryColor,
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 0,
        borderTopRightRadius: 0,
    },

    botaoImprimir: {
        flex: 1,
        width: screenWidth * .15,
        height: 50,
        backgroundColor: successColor,
        borderWidth: 1,
        borderColor: successColor,
        borderRadius: 0
    },

    botaoExcluir: {
        flex: 1,
        width: screenWidth * .15,
        height: 50,
        backgroundColor: errorColor,
        borderWidth: 1,
        borderColor: errorColor,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0
    }
});