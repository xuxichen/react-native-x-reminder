/*
 * @Author: Chad.Xuxichen
 * @Date: 2019-05-20 07:45:32
 * @LastEditors: Chad.Xuxichen
 * @LastEditTime: 2019-06-05 23:13:00
 * @github: https://github.com/xuxichen
 * @Description: 
 */

import React, {Component} from "react";
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, TouchableOpacity, Image, Animated, Easing, Dimensions, Platform} from 'react-native';

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height
const MAXWINDOW = Math.max(windowWidth, windowHeight)
const ScreenScale = windowWidth / 375
const isIphoneX = (Platform.OS === 'ios' && !Platform.isPad && !Platform.isTVOS &&( MAXWINDOW === 812 || MAXWINDOW === 896))

const MessageType = {
    MESSAGE: 'MESSAGE',
    INFO: 'INFO',
    SUCCESS: 'SUCCESS',
    WARNING: 'WARNING',
    ERROR: 'ERROR'
}
const PositionType = {
    TOP: 'TOP',
    CENTER: 'CENTER',
    BOTTOM: 'BOTTOM'
}

const AnimationType = {
    SHOW: 'SHOW',
    SLIDEFROMTOP: 'SLIDEFROMTOP',
    SLIDEFROMRIGHT: 'SLIDEFROMRIGHT',
    SLIDEFROMBOTTOM: 'SLIDEFROMBOTTOM',
    SLIDEFROMLEFT: 'SLIDEFROMLEFT'
}
export {
    MessageType,
    PositionType,
    AnimationType
}

export default class XReminderContainer extends Component {
    static defaultProps = {
        backgroundColor: '#007bff', // default value : blue
        strokeColor: '#006acd', // default value : blue
        
        /* Style for the View, the title, this message and the Icon */
        style: {},
        titleStyle: {},
        messageStyle: {},
        iconStyle: {},

        /* Position and Animation and MessageType of the xReminder */
        positionType: PositionType.TOP,
        animationType: AnimationType.SLIDEFROMTOP,
        messageType: MessageType.INFO,

        /* Cusomisation of the xReminder: Title, Message, Icon URL */
        title: 'ATTENTION！！！',
        message: 'This is a Reminder',
        Icon: '',
        

        /* showTime */
        duration: 2000,

        /* Style MessageType */
        stylesheetInfo: { backgroundColor: '#007bff', strokeColor: '#006acd' }, // Default are blue colors
        stylesheetSuccess: { backgroundColor: 'darkgreen', strokeColor: '#b40000' }, // Default are Green colors
        stylesheetWarning: { backgroundColor: '#ff9c00', strokeColor: '#f29400' }, // Default are orange colors
        stylesheetError: { backgroundColor: '#ff3232', strokeColor: '#FF0000' }, // Default are red colors
        stylesheetMessage: { backgroundColor: '#4d9e97', strokeColor: '#006acd' }, // Default are blue colors, same as info

        /* Duration of the animation */
        durationAnimated: 550,

        /* Offset of the View */
        viewTopOffset: 0,
        viewBottomOffset: 0,
        viewLeftOffset: 0,
        viewRightOffset: 0,

        /* Inset of the view */
        viewTopInset: 0,
        viewBottomInset: 0,
        viewLeftInset: 0,
        viewRightInset: 0,

        /* Number of Lines for Title and Message */
        titleNumberOfLines:  1,
        messageNumberOfLines: 2,

        /* 是否是推送样式 */
        needPushNotifications: false,
        
        /* callback Function */
        onShow: ()=> {console.log('xReminder start onShow callback')},
        onShown: ()=> {console.log('xReminder end onShown callback')},
        onHide: ()=> {console.log('xReminder start onHide callback')},
        onHidden: ()=> {console.log('xReminder end onHidden callback')},
    }

    static propTypes = {
        backgroundColor: PropTypes.string, // default value : blue
        strokeColor: PropTypes.string, // default value : blue
        
        /* Style for the View, the title, this message and the Icon */
        style: PropTypes.object,
        titleStyle: PropTypes.object,
        messageStyle: PropTypes.object,
        iconStyle: PropTypes.object,

        /* Position and Animation  of the xReminder */
        positionType: PropTypes.string,
        animationType: PropTypes.string,
        messageType: PropTypes.string,

        /* Cusomisation of the xReminder: Title, Message, Icon URL */
        title: PropTypes.string,
        message: PropTypes.string,
        Icon: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        
        /* showTime */
        duration: PropTypes.number,

        /* Style MessageType */
        stylesheetInfo: PropTypes.object, // Default are blue colors
        stylesheetSuccess: PropTypes.object, // Default are Green colors
        stylesheetWarning: PropTypes.object, // Default are orange colors
        stylesheetError: PropTypes.object, // Default are red colors
        stylesheetMessage: PropTypes.object, // Default are blue colors, same as info

        /* Duration of the animation */
        durationAnimated: PropTypes.number,

        /* Offset of the View */
        viewTopOffset: PropTypes.number,
        viewBottomOffset: PropTypes.number,
        viewLeftOffset: PropTypes.number,
        viewRightOffset: PropTypes.number,

        /* Inset of the view */
        viewTopInset: PropTypes.number,
        viewBottomInset: PropTypes.number,
        viewLeftInset: PropTypes.number,
        viewRightInset: PropTypes.number,

        /* Number of Lines for Title and Message */
        titleNumberOfLines: PropTypes.number,
        messageNumberOfLines: PropTypes.number,

        /* 是否需要推送样式 */
        needPushNotifications: PropTypes.bool,

        /* state callback Function */
        onShow: PropTypes.func,
        onShown: PropTypes.func,
        onHide: PropTypes.func,
        onHidden: PropTypes.func

    }
    constructor(props) {
        super(props)

        this.animatedValue = new Animated.Value(0)
        this.Timeout = null,
        this.isShown = false
        this.state = {

        }
    }

    componentDidMount() {
        this.showReminderAction()
    }

    componentWillUnmount() {
        clearTimeout(this.Timeout)
        this.Timeout = null
    }
    /*
    * Show the Reminder
    */
    showReminderAction() {
        if (this.isShown) return

        // Set the Reminder in the state
        this.isShown = true;
        clearTimeout(this.Timeout)
        this.Timeout = null
        
        // start then animated
        this.props.onShow()
        Animated.timing(this.animatedValue, {
            toValue: 1,
            duration: this.props.durationAnimated,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true 
        }).start(()=> {
            this.props.onShown()
            this.Timeout = setTimeout(() => {
                this.hideReminderAction()
            }, this.props.duration)
        })
    }
    /*
    * Hide the Reminder
    */
    hideReminderAction() {
        // Hide the Reminder after a delay set in the state only if the Reminder is still visible
        if (!this.isShown) return

        clearTimeout(this.Timeout);

        // Animate the Reminder to hide it to the top of the screen
        this.props.onHide()
        Animated.timing(this.animatedValue, {
            toValue: 0,
            duration: this.props.durationAnimated,
            easing: Easing.in(Easing.ease),
            useNativeDriver: true 
        }).start(() => {
            this.props.onHidden()
        })
    }

    /* init MessageTypeStyle */
    initMessageTypeStyle() {
        switch (this.props.messageType) {
            case MessageType.SUCCESS:
                return this.props.stylesheetSuccess
            case MessageType.ERROR:
                return this.props.stylesheetError
            case MessageType.WARNING:
                return this.props.stylesheetWarning
            case MessageType.INFO:
                return this.props.stylesheetInfo
            case MessageType.MESSAGE:
                return this.props.stylesheetMessage
            default:
                return this.props.stylesheetMessage
        }
    }
    /* init AnimationTypeStyle */
    initAnimationTypeStyle() {
        switch (this.props.animationType) {
            // 中间浮现
            case AnimationType.SHOW:
                return {
                    opacity: this.animatedValue,
                }
            case AnimationType.SLIDEFROMTOP:
                var animationY = this.animatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-windowHeight, 0]
                })
                return {transform: [{ translateY: animationY }]}
            case AnimationType.SLIDEFROMBOTTOM:
                var animationY = this.animatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [windowHeight, 0]
                })
                return {transform: [{ translateY: animationY }]}
            case AnimationType.SLIDEFROMLEFT:
                var animationX = this.animatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-windowWidth, 0]
                })
                return {transform: [{ translateX: animationX }]}
            case AnimationType.SLIDEFROMRIGHT:
                var animationX = this.animatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [windowWidth, 0]
                })
                return {transform: [{ translateX: animationX }]}
            default:
                var animationY = this.animatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-windowHeight, 0]
                })
                return {transform: [{ translateY: animationY }]}
        }
    }
    /* init OffsetAndInsetStyle */
    initOffsetAndInsetStyle() {
        switch(this.props.positionType) {
            case PositionType.TOP:
                return {
                    top: this.props.viewTopOffset,
                    right: this.props.viewRightOffset,
                    left: this.props.viewLeftOffset,
                    paddingTop: isIphoneX?this.props.viewTopInset+40*ScreenScale:this.props.viewTopInset,
                    paddingRight: this.props.viewRightInset,
                    paddingBottom: this.props.viewBottomInset,
                    paddingLeft: this.props.viewLeftInset,
                }
            case PositionType.CENTER: 
                return {
                    // top: windowHeight*3 / 10 + this.props.viewTopOffset,
                    // right: windowWidth*1 / 10 + this.props.viewRightOffset,
                    // left: windowWidth*1 / 10 + this.props.viewLeftOffset,
                    // bottom: windowHeight*3 / 10 + this.props.viewBottomOffset,
                    // marginTop:this.props.viewTopOffset,
                    paddingTop: this.props.viewTopInset,
                    paddingRight: this.props.viewRightInset,
                    paddingBottom: this.props.viewBottomInset,
                    paddingLeft: this.props.viewLeftInset,
                    borderRadius: 5*ScreenScale,
                }
            case PositionType.BOTTOM: 
                return {
                    right: this.props.viewRightOffset,
                    left: this.props.viewLeftOffset,
                    bottom: this.props.viewBottomOffset,
                    paddingTop: this.props.viewTopInset,
                    paddingRight: this.props.viewRightInset,
                    paddingBottom: this.props.viewBottomInset,
                    paddingLeft: this.props.viewLeftInset,
                }
            default: 
                return {
                    top: this.props.viewTopOffset,
                    right: this.props.viewRightOffset,
                    left: this.props.viewLeftOffset,
                    paddingTop: isIphoneX?this.props.viewTopInset+40*ScreenScale:this.props.viewTopInset,
                    paddingRight: this.props.viewRightInset,
                    paddingBottom: this.props.viewBottomInset,
                    paddingLeft: this.props.viewLeftInset,
                }
        }
    }

    /* init PushNotificationsStyle */
    initPushNotificationsStyle() {
        if (this.props.needPushNotifications) {
            switch(this.props.positionType) {
                case PositionType.TOP:
                    return {
                        top: isIphoneX?this.props.viewTopInset+40*ScreenScale:this.props.viewTopInset,
                        right: windowWidth*1/5+this.props.viewRightOffset,
                        left: windowWidth*1/5+this.props.viewLeftOffset,
                        bottom: null,
                        paddingTop: this.props.viewTopInset,
                        paddingRight: this.props.viewRightInset,
                        paddingBottom: this.props.viewBottomInset,
                        paddingLeft: this.props.viewLeftInset,
                        shadowColor: '#000000',
                        shadowOffset: {
                            width: 0,
                            height: 4*ScreenScale
                        },
                        shadowOpacity: 0.8*ScreenScale,
                        shadowRadius: 6*ScreenScale,
                        elevation: 10,
                        borderRadius: 5*ScreenScale
                    }
                case PositionType.CENTER: 
                    return {
                        paddingTop: this.props.viewTopInset,
                        paddingRight: this.props.viewRightInset,
                        paddingBottom: this.props.viewBottomInset,
                        paddingLeft: this.props.viewLeftInset,
                        shadowColor: '#000000',
                        shadowOffset: {
                            width: 0,
                            height: 4*ScreenScale
                        },
                        shadowOpacity: 0.8*ScreenScale,
                        shadowRadius: 6*ScreenScale,
                        elevation: 10,
                        borderRadius: 5*ScreenScale
                    }
                case PositionType.BOTTOM: 
                    return {
                        top: null,
                        right: windowWidth*1/5+this.props.viewRightOffset,
                        left: windowWidth*1/5+this.props.viewLeftOffset,
                        bottom: this.props.viewBottomOffset,
                        paddingTop: this.props.viewTopInset,
                        paddingRight: this.props.viewRightInset,
                        paddingBottom: this.props.viewBottomInset,
                        paddingLeft: this.props.viewLeftInset,
                        shadowColor: '#000000',
                        shadowOffset: {
                            width: 0,
                            height: 4*ScreenScale
                        },
                        shadowOpacity: 0.8*ScreenScale,
                        shadowRadius: 6*ScreenScale,
                        elevation: 10,
                        borderRadius: 5*ScreenScale
                    }
                default: 
                    return {
                        top: isIphoneX?this.props.viewTopInset+40*ScreenScale:this.props.viewTopInset,
                        right: windowWidth*1/5+this.props.viewRightOffset,
                        left: windowWidth*1/5+this.props.viewLeftOffset,
                        bottom: null,
                        paddingTop: this.props.viewTopInset,
                        paddingRight: this.props.viewRightInset,
                        paddingBottom: this.props.viewBottomInset,
                        paddingLeft: this.props.viewLeftInset,
                        shadowColor: '#000000',
                        shadowOffset: {
                            width: 0,
                            height: 4*ScreenScale
                        },
                        shadowOpacity: 0.8*ScreenScale,
                        shadowRadius: 6*ScreenScale,
                        elevation: 10,
                        borderRadius: 5*ScreenScale
                    }
            }
        }
        return {}
    }
    
    initrightMaxWidthStyle() {
        if (Object.keys(this.props.iconStyle).length>0 && this.props.iconStyle.width !== 'undefined' &&  this.props.iconStyle.width !== null) {
            return {
                maxWidth: windowWidth - this.props.iconStyle.width - 60 * ScreenScale
            }
        } else {
            return {}
        }
        
    }
    
    renderImage() {
        if (!(typeof this.props.Icon === 'undefined' || this.props.Icon == null || this.props.Icon === '')) {
            if ((typeof this.props.Icon === 'string' && this.props.Icon !== 'none') || typeof this.props.Icon === 'number') {
                var imageSource;
                let uri = this.props.Icon;
                if (!!(typeof uri === 'string' && (uri.match(/^https?:/) || uri.match(/^http?:/)))) {
                    // this is a network file
                    imageSource = { uri: this.props.Icon }
                } else {
                    // this is a local file : require('<path/to/my/local/image.extension>')
                    imageSource = this.props.Icon
                }
                return (
                    <Image defaultSource={require('./Icon/info-square.png')} source={imageSource} style={[styles.iconStyle,this.props.iconStyle]} />
                );
            }   
        } else {
            switch (this.props.messageType) {
                case MessageType.SUCCESS:
                    return (<Image source={require('./Icon/success.png')} style={[styles.iconStyle,this.props.iconStyle]} />)
                case MessageType.ERROR:
                    return (<Image source={require('./Icon/error.png')} style={[styles.iconStyle,this.props.iconStyle]} />)
                case MessageType.WARNING:
                    return (<Image source={require('./Icon/warning.png')} style={[styles.iconStyle,this.props.iconStyle]} />)
                case MessageType.INFO:
                    return (<Image source={require('./Icon/info-square.png')} style={[styles.iconStyle,this.props.iconStyle]} />)
                case MessageType.MESSAGE:
                    return (<Image source={require('./Icon/message.png')} style={[styles.iconStyle,this.props.iconStyle]} />)
                default:
                    return (<Image source={require('./Icon/message.png')} style={[styles.iconStyle,this.props.iconStyle]} />)
            }
        }
    }
    
    
    renderTitle() {
        if (this.props.title && this.props.title !== 'none') {
            return (
                <Text 
                    numberOfLines={this.props.titleNumberOfLines} 
                    style={[styles.titleStyle, this.props.titleStyle]}
                >
                    {this.props.title}
                </Text>
            )
        }
    }
    
    renderMessage() {
        if (this.props.message && this.props.message !== 'none') {
            return (
                <Text 
                    numberOfLines={this.props.messageNumberOfLines} 
                    style={[styles.messageStyle, this.props.messageStyle]}
                >
                    {this.props.message}
                </Text>
            )
        }
    }
    
    render() {
        let messageTypeStyle = this.initMessageTypeStyle()
        let AnimationTypeStyle = this.initAnimationTypeStyle()
        let OffsetAndInsetStyle = this.initOffsetAndInsetStyle()
        let pushNotificationsStyle = this.initPushNotificationsStyle()
        let rightMaxWidthStyle = this.initrightMaxWidthStyle()
        return (
            <View pointerEvents="none" style={styles.transparentview}>
            <Animated.View style={[styles.animated, messageTypeStyle, AnimationTypeStyle,OffsetAndInsetStyle, this.props.style, pushNotificationsStyle]}>
                <View style={styles.container} >
                    {this.renderImage()}
                    <View style={[styles.rightStyle,rightMaxWidthStyle]} >
                        {this.renderTitle()}
                        {this.renderMessage()}
                    </View> 
                    
                </View>
            </Animated.View>
            </View>
        )
    }
    
}

const styles = StyleSheet.create({
    transparentview: {
        backgroundColor : 'transparent',
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        flex:1,
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    },
    animated: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#007bff',
        borderColor: '#006acd',
        borderBottomWidth: 1*ScreenScale,
        position: 'absolute',
    },
    container: {
        flexDirection: 'row',
        justifyContent:'center',
        alignItems: 'center', 
        padding: 10*ScreenScale,
    },
    rightStyle: { 
        alignSelf: 'stretch', 
        justifyContent: 'center', 
        marginLeft: 10*ScreenScale,
        maxWidth: windowWidth - 100*ScreenScale,
    },
    titleStyle: {
        color: 'white', 
        fontSize: 18*ScreenScale, 
        fontWeight: 'bold'
    },
    messageStyle: {
        color: 'white', 
        fontSize: 16*ScreenScale,
    },
    iconStyle: { 
        height: 40*ScreenScale,
        width: 40*ScreenScale,
    },
});