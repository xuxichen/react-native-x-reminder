/*
 * @Author: Chad.Xuxichen
 * @Date: 2019-05-23 00:36:08
 * @LastEditors: Chad.Xuxichen
 * @LastEditTime: 2019-05-23 00:43:50
 * @github: https://github.com/xuxichen
 * @Description: 
 */
import { Easing, Animated } from "react-native";
import TabA from './TabA'
import TabB from './TabB'
import TabC from './TabC'
import TabD from './TabD'
import DetailA from './DetailA'
import {
    createBottomTabNavigator,
    createStackNavigator,
    createAppContainer,
} from "react-navigation";
const APP = createBottomTabNavigator(
    {
        TabA,
        TabB,
        TabC,
        TabD
    },
    {
        initialRouteName: "TabA",
        tabBarPosition: "bottom",
        lazy: true,
        swipeEnabled: false,
        animationEnabled: true,
        tabBarOptions: {
            activeTintColor: "#6587e8",
            inactiveTintColor: "#999",
            showIcon: true,
            style: {
                height: 50,
                paddingTop: 5,
                backgroundColor: "white"
            },
            tabStyle: {
                borderBottomWidth: 0,
                marginBottom: 0,
                justifyContent: "center",
            },
            labelStyle: {
                height: 15,
            },
            iconStyle: {
                height: 7.5,
            },
            indicatorStyle: {
                height: 0,
            }
        }
    }
  );
  
  const Router = createStackNavigator(
    {
        APP,
        DetailA
    },
    {
        initialRouteName: "APP",
        headerMode: "none",
        transitionConfig: () => ({
            transitionSpec: {
                duration: 500,
                easing: Easing.out(Easing.poly(4)),
                timing: Animated.timing,
            },
            screenInterpolator: sceneProps => {
                const { layout, position, scene } = sceneProps;
                const { index } = scene;
        
                const height = layout.initHeight;
                const translateY = position.interpolate({
                    inputRange: [index - 1, index, index + 1],
                    outputRange: [height, 0, 0],
                });
        
                const opacity = position.interpolate({
                    inputRange: [index - 1, index - 0.99, index],
                    outputRange: [0, 1, 1],
                });
        
                return { opacity, transform: [{ translateY }] };
            },
        }),
        }
  );
  
  export default createAppContainer(Router);