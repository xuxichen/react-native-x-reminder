# react-native-x-reminder

A Message Slide Reminder, JS

# ==Warning==
**Because [react-native-root-siblings 3.2.1](https://github.com/magicismight/react-native-root-siblings.git)  Require React-Native version >= 0.47, So *++react-native-x-reminder++* Only supports React-Native version >= 0.47**

# Installation
```
npm install --save react-native-x-reminder
```
or
```
yarn add react-native-x-reminder
```

# Example
In the react-native-x-reminder package directory:
```
cd Example
npm install
react-native link
```
To run example on iOS:
```
react-native run-ios
```
To run example on Android:
```
react-native run-android
```
# Screenshots
![Screenshot](https://github.com/xuxichen/react-native-x-reminder/blob/master/Demo.gif?raw=true)

# Basic Usage
### 1. import 
```
import XReminder, {
    MessageType,
    PositionType,
    AnimationType
} from 'react-native-x-reminder'
```
### 2. Use

```
XReminder.Show()
```
### Customized Personalization

```
XReminder.Show({
            title: '这是一个标题',
            message: '这是一个信息',
            Icon: require('./icon.jpg'),
            style: {backgroundColor: '#98adb8'},
            titleStyle: {},
            messageStyle: {color: '#000000'},
            iconStyle: {},
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
```

# Thanks
##### This project is based on [react-native-message-bar](https://github.com/KBLNY/react-native-message-bar.git) and [react-native-root-siblings](https://github.com/magicismight/react-native-root-siblings.git). Thanks very much  the contributions of the two authors 
- [Horcrux](https://github.com/magicismight)
- [Kevin](https://github.com/KBLNY)
