/*
 * @Author: Chad.Xuxichen
 * @Date: 2019-05-23 00:40:40
 * @LastEditors: Chad.Xuxichen
 * @LastEditTime: 2019-06-05 23:16:51
 * @github: https://github.com/xuxichen
 * @Description: 
 */

import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native"
import XReminder, {
    MessageType,
    PositionType,
    AnimationType
} from 'react-native-x-reminder'
export default class TabA extends Component {
    static navigationOptions = {
        tabBarLabel: 'TabBarA',
    }
  
    showDefaultXReminder() {
        XReminder.Show()
    }

    showCenterXReminder() {
        XReminder.Show({
            positionType: PositionType.CENTER,
            animationType: AnimationType.SHOW,
        })
    }

    SlideFromLeftBottomXReminder() {
        XReminder.Show({
            positionType: PositionType.BOTTOM,
            animationType: AnimationType.SLIDEFROMLEFT,
        })
    }

    showMessageXReminder() {
        XReminder.Message()
    }

    showInfoXReminder() {
        XReminder.Info()
    }

    showSuccessXReminder() {
        XReminder.Success()
    }

    showWarningXReminder() {
        XReminder.Warning()
    }

    showErrorXReminder() {
        XReminder.Error()
    }
    
    showNoIconAndTitleXReminder() {
        XReminder.Show({title: 'none', Icon: 'none'})
    }

    showPersonalizationXReminder() {
        XReminder.Show({
            title: '这是一个标题',
            message: '这是一个信息',
            Icon: require('./icon.jpg'),
            style: {backgroundColor: '#98adb8'},
            titleStyle: {},
            messageStyle: {color: '#000000'},
            iconStyle: {
                width:60,
                height: 60
            },
            duration: 1000, //duration
            durationAnimated: 300, // durationAnimated 
            needPushNotifications: false, // is Not PushNotificationsModeStyle
            positionType: PositionType.CENTER,
            animationType: AnimationType.SLIDEFROMRIGHT,
            messageType: MessageType.ERROR,
            onShow: ()=> {console.log('xReminder start onShow callback')},
            onShown: ()=> {console.log('xReminder end onShown callback')},
            onHide: ()=> {console.log('xReminder start onHide callback')},
            onHidden: ()=> {console.log('xReminder end onHidden callback')}
        })
    }
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={()=>{this.showDefaultXReminder()}}>
                    <Text style={styles.buttonContainer}> Default XReminder</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{this.showCenterXReminder()}}>
                    <Text style={styles.buttonContainer}> SHOW XReminder</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{this.SlideFromLeftBottomXReminder()}}>
                    <Text style={styles.buttonContainer}> Slide From Left Bottom XReminder</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{this.showMessageXReminder()}}>
                    <Text style={styles.buttonContainer}> Message XReminder</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{this.showInfoXReminder()}}>
                    <Text style={styles.buttonContainer}> Info XReminder</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{this.showSuccessXReminder()}}>
                    <Text style={styles.buttonContainer}> Success XReminder</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{this.showWarningXReminder()}}>
                    <Text style={styles.buttonContainer}> Warning XReminder</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{this.showErrorXReminder()}}>
                    <Text style={styles.buttonContainer}> Error XReminder</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{this.showNoIconAndTitleXReminder()}}>
                    <Text style={styles.buttonContainer}> NoIcon and Title XReminder</Text>
                </TouchableOpacity>
                <Text>-----------------------------------------</Text>
                <TouchableOpacity onPress={()=>{this.showPersonalizationXReminder()}}>
                    <Text style={styles.buttonContainer}> Customized Personalization XReminder</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    buttonContainer: {
        alignSelf: 'stretch',
        textAlign: 'center',
        backgroundColor: 'blue',
        color: 'white',
        padding: 10,
        margin: 10,
    }
  });