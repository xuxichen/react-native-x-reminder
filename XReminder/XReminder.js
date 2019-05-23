/*
 * @Author: Chad.Xuxichen
 * @Date: 2019-05-20 07:44:38
 * @LastEditors: Chad.Xuxichen
 * @LastEditTime: 2019-05-23 14:44:42
 * @github: https://github.com/xuxichen
 * @Description: 
 */


import React, { Component } from 'react'
import RootSiblings from 'react-native-root-siblings'
import XReminderContainer, { MessageType, PositionType, AnimationType} from './XReminderContainer'

class XReminder extends Component {
    static displayName = 'XReminder';
    constructor(props) {
        super(props)
        this._xRemind = null
    }

    static Show(options) {
        if (this._xRemind instanceof RootSiblings) return
        let {onShow,onShown,onHide,onHidden, ...xReminderProps} = options && typeof options === 'object' ? options : {};  
        this._xRemind = new RootSiblings(<XReminderContainer
            
                {...xReminderProps}
                onShow = {()=> {
                    onShow&&onShow()
                    console.log('动画效果') 
                }}
                onShown ={()=> {
                    onShown&&onShown()
                }}
                onHide={onHide?onHide() :()=> {
                    onHide&&onHide()
                }}
                onHidden={()=> {
                    onHidden&&onHidden()
                    this._xRemind.destroy()
                    this._xRemind=null
                }}
            
        />)
        return this._xRemind 
    }
    static Hide = () => {
        if (this._xRemind instanceof RootSiblings) {
            this._xRemind.destroy()
            this._xRemind=null
        } else {
            console.warn(`xRemind.hide expected a \`RootSiblings\` instance as argument.\nBut got \`${typeof this._xRemind}\` instead.`);
        }
    };
    
    static Message(title, message, duration=2000, positionType=PositionType.TOP, animationType=AnimationType.SLIDEFROMTOP) {
        return this.Show({title, message, messageType:MessageType.MESSAGE, duration, positionType, animationType})
    }
    
    static Info(title, message, duration=2000, positionType=PositionType.TOP, animationType=AnimationType.SLIDEFROMTOP) {
        return this.Show({title, message, messageType:MessageType.INFO, duration, positionType, animationType})
    }

    static Success(title, message, duration=2000, positionType=PositionType.TOP, animationType=AnimationType.SLIDEFROMTOP) {
        return this.Show({title, message, messageType:MessageType.SUCCESS, duration, positionType, animationType})
    }

    static Warning(title, message, duration=2000, positionType=PositionType.TOP, animationType=AnimationType.SLIDEFROMTOP) {
        return this.Show({title, message, messageType:MessageType.WARNING, duration, positionType, animationType})
    }

    static Error(title, message, duration=2000, positionType=PositionType.TOP, animationType=AnimationType.SLIDEFROMTOP) {
        return this.Show({title, message, messageType:MessageType.ERROR, duration, positionType, animationType})
    }


    componentWillMount = () => {
        this._xRemind = new RootSiblings(<XReminderContainer
            {...this.props}
            duration={0}
        />);
    };

    componentWillReceiveProps = nextProps => {
        this._xRemind.update(<XReminderContainer
            {...nextProps}
            duration={0}
        />);
    };

    componentWillUnmount = () => {
        this._xRemind.destroy();
    };

    render() {
        return null;
    }
    
}

export {
    RootSiblings as Manager,
    MessageType,
    PositionType,
    AnimationType
}
export default XReminder
