/*
 * @Author: Chad.Xuxichen
 * @Date: 2019-05-23 00:19:34
 * @LastEditors: Chad.Xuxichen
 * @LastEditTime: 2019-05-23 15:04:21
 * @github: https://github.com/xuxichen
 * @Description: 
 */

declare module "react-native-x-reminder"{
    import * as React from 'react';
    import * as ReactNative from "react-native";
    import {TextStyle,StyleProp,ViewStyle, ImageStyle} from "react-native";
    export interface XReminderOptions {
        backgroundColor: string, // default value : blue
        strokeColor: string, // default value : blue
        
        /* Style for the View, the title, this message and the Icon */
        style?: StyleProp<ViewStyle>,
        titleStyle?: StyleProp<TextStyle>,
        messageStyle?: StyleProp<TextStyle>,
        iconStyle?: StyleProp<ImageStyle>,

        /* Position and Animation  of the xReminder */
        positionType?: PositionType,
        animationType?: AnimationType,
        messageType?: MessageType,

        /* Cusomisation of the xReminder: Title, Message, Icon URL */
        title?: string,
        message?: string,
        Icon?: string | object,
        
        /* showTime */
        duration?: number,

        /* Style MessageType */
        stylesheetInfo?: StyleProp<ViewStyle>, // Default are blue colors
        stylesheetSuccess?: StyleProp<ViewStyle>, // Default are Green colors
        stylesheetWarning?: StyleProp<ViewStyle>, // Default are orange colors
        stylesheetError?: StyleProp<ViewStyle>, // Default are red colors
        stylesheetMessage?: StyleProp<ViewStyle>, // Default are blue colors, same as info

        /* Duration of the animation */
        durationAnimated?: number,

        /* Offset of the View */
        viewTopOffset?: number,
        viewBottomOffset?: number,
        viewLeftOffset?: number,
        viewRightOffset?: number,

        /* Inset of the view */
        viewTopInset?: number,
        viewBottomInset?: number,
        viewLeftInset?: number,
        viewRightInset?: number,

        /* Number of Lines for Title and Message */
        titleNumberOfLines?: number,
        messageNumberOfLines?: number,

        /* 是否需要推送样式 */
        needPushNotifications: boolean,

        /* state callback Function */
        onShow?: Function,
        onShown?: Function,
        onHide?: Function,
        onHidden?: Function,

    }

    export interface XReminderProps extends XReminderOptions,ReactNative.ViewProperties{
    }

    export interface MessageType {
        MESSAGE: string,
        INFO: string,
        SUCCESS: string,
        WARNING: string,
        ERROR: string
    }
    export interface PositionType {
        TOP: string,
        CENTER: string,
        BOTTOM: string
    }
    
    export interface AnimationType {
        SHOW: string,
        SLIDEFROMTOP: string,
        SLIDEFROMRIGHT: string,
        SLIDEFROMBOTTOM: string,
        SLIDEFROMLEFT: string
    }

    export default class XReminder extends React.Component<XReminderProps>{
        static Show:(options?:XReminderOptions)=>any;
        static Hide:()=>void;
        static Message:(title:string, message:string, messageType:MessageType, duration:number, positionType:PositionType, animationType:AnimationType)=> any;
        
        static Info:(title:string, message:string, messageType:MessageType, duration:number, positionType:PositionType, animationType:AnimationType)=> any;
        
        static Success:(title:string, message:string, messageType:MessageType, duration:number, positionType:PositionType, animationType:AnimationType)=> any;

        static Warning:(title:string, message:string, messageType:MessageType, duration:number, positionType:PositionType, animationType:AnimationType)=> any;

        static Error:(title:string, message:string, messageType:MessageType, duration:number, positionType:PositionType, animationType:AnimationType)=> any;

    }

    export class XReminderContainer extends React.Component<XReminderProps> {}
}
